using NPoco;
using System;
using System.Collections.Generic;
using System.Text;

namespace ModelBuilder
{
    [PrimaryKey("id")]
    class trainingData
    {
        public int id { get; set; }
        public string title { get; set; }
        public bool isClickbait { get; set; }
    }
}
