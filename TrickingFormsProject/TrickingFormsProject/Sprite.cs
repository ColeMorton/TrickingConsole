using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TrickingFormsProject.Actions;

namespace TrickingFormsProject
{
    public class Sprite
    {
        private string sprName;
        private Point sprPos;
        private Point sprPrePos;
        private Direction sprDir;
        private Abilities MIF;
        private bool canWalk = false;
        private bool canRun = false;
        private bool canFly = false;
        private Image sprPreImg;

        private Frame sprPreFrm;
        public Stand sprStand;
        public Walk sprWalk;

        public enum Abilities
        {
            Walk,
            Run,
            Fly
        }

        public enum Direction
        {
            Up,
            Down,
            Left,
            Right
        }

        public enum Frame
        {
            O,
            A,
            B
        }

        public Sprite(string sprName, string[] imageArray)
{
	this.sprName = sprName;
	this.sprDir = Direction.Down;

	sprPos.X = 50;
	sprPos.Y = 50;
	sprStand = new Stand(imageArray);
}

        public void Add_Abl(Abilities abl, string[] imageArray)
{
	switch (abl) {
		case Abilities.Walk:
			sprWalk = new Walk(imageArray);
			canWalk = true;
			break;
		case Abilities.Run:
			canRun = true;
			break;
		case Abilities.Fly:
			canFly = true;
			break;
	}
}

public void Move_Sprite(Abilities MIF, Direction sprDir)
{
	switch (MIF) {
		case Abilities.Walk:
			sprWalk.Move_Sprite(sprDir);
			break;
		case Abilities.Run:
			sprWalk.Move_Sprite(sprDir);
			break;
		case Abilities.Fly:
			sprWalk.Move_Sprite(sprDir);
			break;
	}
}

public string getSprName {
	get { return sprName; }
}

public bool getCanWalk
{
	get { return canWalk; }
}

public bool getCanRun
{
	get { return canRun; }
}

public bool getCanFly {
	get { return canFly; }
}

public Point getSprPos
{
	get { return sprPos; }
}

public Point setSprPos {
	set { sprPos = value; }
}

public Point getSprPrePos
{
	get { return sprPrePos; }
}

public Point setSprPrePos {
	set { sprPrePos = value; }
}

public Direction getSprDir
{
	get { return sprDir; }
}

public Direction setSprDir
{
	set { sprDir = value; }
}

public Abilities getMIF
{
	get { return MIF; }
}

public Abilities setMIF {
	set { MIF = value; }
}

public Image getSprPreImg
{
	get { return sprPreImg; }
}

public Image setSprPreImg {
	set { sprPreImg = value; }
}

public Frame getSprPreFrm
{
	get { return sprPreFrm; }
}

public Frame setSprPreFrm {
	set { sprPreFrm = value; }
}

    }
}
