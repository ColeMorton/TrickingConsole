namespace Tricking.Domain.Data
{
    public class TrickTypeProficiency  
    {
        public int Id { get; set; }
        public int Control { get; set; }

        public int TrickTypeId { get; set; }
        public virtual TrickType TrickType { get; set; }
    }
}