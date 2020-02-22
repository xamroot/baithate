using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BaitHateAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BaitHateAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaitHateController : ControllerBase
    {

        private readonly BaitHateContext _context;

        public BaitHateController(BaitHateContext context)
        {
            _context = context;
        }
        
        [HttpGet("GetPrediction")]
        public List<float> GetPrediction(List<string> titles)
        {
            byte[] model = _context.Models.ToList()[0].Model;

            throw new NotImplementedException();
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
    }
}