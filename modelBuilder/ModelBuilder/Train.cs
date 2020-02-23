using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Microsoft.ML;
using Microsoft.ML.AutoML;
using NPoco;

namespace ModelBuilder
{
    public static class Train
    {
        [FunctionName("Train")]
        public static void Run([HttpTrigger()]HttpRequest req, ILogger log)
        {
            var connection = File.ReadAllLines("Settings.txt");

            var db = new Database(
                    $"Data Source={connection[2]};Initial Catalog={connection[0]};User ID={connection[0]};Password={connection[1]};MultipleActiveResultSets=True;",
                    DatabaseType.SqlServer2012,
                    SqlClientFactory.Instance
                );

            var trainingDataList = db.Fetch<TrainData>("SELECT title as Title, isClickbait as Label FROM [trainingData]");

            MLContext context = new MLContext();
            var trainingData = context.Data.LoadFromEnumerable<TrainData>(trainingDataList);
            var settings = new BinaryExperimentSettings();
            settings.MaxExperimentTimeInSeconds = 60;
            var mlExperiment = context.Auto().CreateBinaryClassificationExperiment(settings);
            var results = mlExperiment.Execute(trainingData);

            log.LogInformation($"Train complete: {results.BestRun.ValidationMetrics.Accuracy}%");
            log.LogInformation($"Train complete: {results.BestRun.TrainerName}");

            try
            {
                db.BeginTransaction();
                db.Execute("DELETE FROM models");
                using(MemoryStream ms = new MemoryStream())
                {
                    context.Model.Save(results.BestRun.Model, trainingData.Schema, ms);
                    var model = new models() { model = ms.ToArray() };
                    db.Save(model);
                }
                db.CompleteTransaction();
            }
            catch
            {
                db.AbortTransaction();
            }
        }
    }
}
