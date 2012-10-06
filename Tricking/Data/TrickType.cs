using System.Collections.Generic;

namespace Tricking.Domain.Data
{
    public class TrickType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Trick> Tricks { get; set; }
    }
}