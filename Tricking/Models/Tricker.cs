namespace Tricking.Models
{
    public enum Trickers
    {
        Vellu = 1,
        Scotty = 2,
        Danny = 3
    }

    public abstract class Tricker
    {
        public int Power { get; set; }
        public int Style { get; set; }
        public int Technicality { get; set; }
        public Trickers Name { get; set; }
    }

    public class Vellu
    {
    }    
    
    public class Scotty
    {
    }      
    
    public class Danny : Tricker
    {
        public Trick[] TrickList
        {
            get
            {
                return new[]
                           {
                               new Trick(Name, Tricks.Pop360, 9), 
                               new Trick(Name, Tricks.BackFlip, 4), 
                               new Trick(Name, Tricks.ButterflyTiwst, 6)
                           };
            }
        }
    }    
}
