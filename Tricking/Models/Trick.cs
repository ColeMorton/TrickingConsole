namespace Tricking.Models
{
    public enum Tricks
    {
        Pop360 = 1,
        BackFlip = 2,
        ButterflyTiwst = 3
    }

    public interface ITrick
    {
        Tricks Name { get; }
    }

    public abstract class BaseTrick
    {
        protected BaseTrick(int profiency)
        {
            Proficiency = profiency;
        }

        public int Proficiency { get; private set; }
    }

    public abstract class Kick : BaseTrick
    {
        protected Kick(int profiency) : base(profiency)
        {
        }
    }

    public abstract class Flip : BaseTrick
    {
        protected Flip(int profiency) : base(profiency)
        {
        }
    }

    public abstract class Twist : BaseTrick
    {
        protected Twist(int profiency) : base(profiency)
        {
        }
    }

    public class Pop360 : Kick, ITrick
    {
        public Pop360(int profiency) : base(profiency)
        {
        }

        public Tricks Name { get { return Tricks.Pop360; } }
    }

    public class BackFlip : Flip, ITrick
    {
        public BackFlip(int profiency) : base(profiency)
        {
        }

        public Tricks Name { get { return Tricks.BackFlip; } }
    }

    public class ButterflyTiwst : Twist, ITrick
    {
        public ButterflyTiwst(int profiency) : base(profiency)
        {
        }

        public Tricks Name { get { return Tricks.ButterflyTiwst; } }
    }
}
