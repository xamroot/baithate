using Microsoft.ML.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaitHateAPI.Models.ML
{
    public class TitleOutput
    {
        [ColumnName("Score")]
        public float Results { get; set; } 

        public float Probabilities { get {
                    float k = (float) Math.Exp(Results);
                    return k / (1.0f + k);
            }
        }
    }
}
