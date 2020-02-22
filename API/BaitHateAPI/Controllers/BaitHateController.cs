using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BaitHateAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.ML;
using BaitHateAPI.Models.ML;

namespace BaitHateAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaitHateController : ControllerBase
    {

        private readonly BaitHateContext _context;

        private static DateTime? modelLastDownload;

        public BaitHateController(BaitHateContext context)
        {
            _context = context;
        }
        
        [HttpPost("GetPrediction")]
        public ActionResult<List<float>> GetPrediction([FromBody] List<string> titles)
        {
            if ((modelLastDownload == null || DateTime.Now > modelLastDownload.Value.AddHours(5)))
            {
                //Save the model as zip
                byte[] model = _context.Models.ToList()[0].Model;
                System.IO.File.WriteAllBytes("model.zip", model);
                modelLastDownload = DateTime.Now;
            }
            
            //Load the Trained Model
            MLContext mlContext = new MLContext();
            DataViewSchema modelSchema;
            ITransformer trainedModel = mlContext.Model.Load("model.zip", out modelSchema);

            PredictionEngine<TitleInput, TitleOutput> predictionEngine = mlContext.Model.CreatePredictionEngine<TitleInput, TitleOutput>(trainedModel);

            //Prepare input data
            List<float> result = new List<float>();
            titles.ForEach(title =>
            {
                var temp = new TitleInput { Title = title };
                result.Add(predictionEngine.Predict(temp).Probabilities);
            });

            return result;
        }

        [HttpGet("GetAllFeedback")]
        public ActionResult<List<Vote>> GetAllFeedback()
        {
            return _context.Votes.ToList();
        }

        [HttpPost("InsertTraining")]
        public ActionResult InsertTraining([FromBody] TrainingData data)
        {
            if(_context.TrainingData.Where(d => data.Title == d.Title).ToList().Count > 0)
            {
                _context.Entry(data).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok();
            }
            _context.TrainingData.Add(data);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("AddUserFeedback")]
        public ActionResult AddUserFeedback(string title, bool isGood)
        {
            List<Vote> voteList = _context.Votes.Where(link => link.Title == title).ToList();

            //If title does not exists, add it to the database
            if(voteList.Count == 0)
            {
                Vote newVote = new Vote(title, isGood);
                _context.Votes.Add(newVote);
                _context.SaveChanges();
                return Ok();
            }

            //If the title does exists, increment
            voteList[0].AddVote(isGood);
            _context.Entry(voteList[0]).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
            
        }

        [HttpGet("GetDescription")]
        public String GetDescription(string title)
        {
            throw new NotImplementedException();
        }

        [HttpGet("Test")]
        public String Test(string test)
        {
            return test;
        }
    }
}