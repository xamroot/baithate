using Microsoft.ML.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaitHateAPI.Models.ML
{
    public class TitleInput
    {
        [LoadColumn(0)]
        public string Title { get; set; }
        [LoadColumn(1)]
        public bool Label { get; set; }
    }
}
