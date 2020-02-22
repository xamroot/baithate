using System;
using System.Collections.Generic;

namespace BaitHateAPI.Models
{
    public partial class TrainingData
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsClickbait { get; set; }
    }
}
