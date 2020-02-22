using System;
using System.Collections.Generic;

namespace BaitHateAPI.Models
{
    public partial class Vote
    {
        public Vote() : base()
        {

        }
        public Vote(string title, bool isGood)
        {
            Title = title;
            Good = isGood ? 1 : 0;
            Bad = isGood ? 0 : 1;

        }

        public void AddVote(bool isGood)
        {
            if (isGood)
                Good++;
            else
                Bad++;
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public int Good { get; set; }
        public int Bad { get; set; }
    }
}
