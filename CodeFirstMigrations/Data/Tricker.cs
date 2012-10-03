using System.Collections.Generic;

namespace Data
{
    public class Tricker
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<TrickersTrick> TrickersTricks { get; set; }
    }
}