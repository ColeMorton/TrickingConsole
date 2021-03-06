﻿using System.Data.Entity;

namespace Data
{
    public class TrickingContext : DbContext 
    {
        public DbSet<Tricker> Trickers{ get; set; }
        public DbSet<Trick> Tricks{ get; set; }
        public DbSet<TrickersTrick> TrickersTricks{ get; set; }
    }
}
