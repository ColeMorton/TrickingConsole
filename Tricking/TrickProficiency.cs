namespace Tricking.Domain
{
    public class TrickProficiency  
    {
        public int Id { get; set; }
        public int Control { get; set; }

        public int TrickerId { get; set; }
        public virtual Tricker Tricker { get; set; }

        public int TrickId { get; set; }
        public virtual Trick Trick { get; set; }
    }
}