using NPoco;
using System;
using System.Collections.Generic;
using System.Text;

namespace ModelBuilder
{
    [PrimaryKey("model", AutoIncrement = false)]
    class models
    {
        public byte[] model { get; set; }
    }
}
