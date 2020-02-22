using Microsoft.ML.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace ModelBuilder
{
    class TrainData
    {
        [LoadColumn(0)]
        public string Title { get; set; }
        [LoadColumn(1)]
        public bool Label { get; set; }
    }
}
