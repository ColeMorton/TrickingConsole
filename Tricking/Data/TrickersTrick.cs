namespace Tricking.Domain.Data
{
    public class TrickersTrick 
    {
        public int Id { get; set; }
        public int TrickerId { get; set; }
        public int Profiency { get; set; }

        public int TrickId { get; set; }
        public virtual Trick Trick { get; set; }
    }
}