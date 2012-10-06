using System.Collections.Generic;

namespace Tricking.Domain.Data
{
    public class Tricker
    {
        public int Id { get; set; }
        public int Power { get; set; }
        public int Style { get; set; }
        public int Technicality { get; set; }
        public string Name { get; set; }

        public ICollection<TrickersTrick> Tricks { get; set; }
    }
}
