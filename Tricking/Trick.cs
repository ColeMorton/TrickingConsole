namespace Tricking.Domain
{
    public class Trick
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Abbrev { get; set; }

        public int TrickTypeId { get; set; }
        public TrickType TrickType { get; set; }
    }
}