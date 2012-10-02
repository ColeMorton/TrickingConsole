namespace Tricking.Models
{
    public class Trick
    {
        public Trick(Trickers tricker, Tricks trick, int profiency)
        {
            Tricker = tricker;
            TrickType = trick;
            Profiency = profiency;
        }

        public Trickers Tricker { get; set; }
        public Tricks TrickType { get; set; }
        public int Profiency { get; set; }
    }
}
