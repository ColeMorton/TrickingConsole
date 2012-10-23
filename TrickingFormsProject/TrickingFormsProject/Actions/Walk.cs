using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrickingFormsProject.Actions
{
    public class Walk
    {
        public Image dirUp_A;
        public Image dirDown_A;
        public Image dirLeft_A;
        public Image dirRight_A;
        public Image dirUp_B;
        public Image dirDown_B;
        public Image dirLeft_B;
        public Image dirRight_B;
        private string[] imageArray;
        private Point sprPos;
        private Point sprPrePos;
        private Sprite.Direction sprDir;
        private double dist = 5.88;
        private Image sprPreImg;
        private Image sprImg;

        private Rectangle clrPreImg = new Rectangle();
        public Walk(string[] imageArray)
        {
            this.imageArray = imageArray;
            //Main.SIF.setSprPreImg = Main.SIF.sprStand.dirDown;

            dirUp_A = Image.FromFile(imageArray[0]);
            dirUp_B = Image.FromFile(imageArray[1]);
            dirDown_A = Image.FromFile(imageArray[2]);
            dirDown_B = Image.FromFile(imageArray[3]);
            dirLeft_A = Image.FromFile(imageArray[4]);
            dirLeft_B = Image.FromFile(imageArray[5]);
            dirRight_A = Image.FromFile(imageArray[6]);
            dirRight_B = Image.FromFile(imageArray[7]);
        }

        public void Move_Sprite(Sprite.Direction sprDir)
        {
            //switch (Main.SIF.getSprPreFrm)
            //{
            //    case Sprite.Frame.O:
            //        Main.GameSpeed.TimerFrame1.Enabled = true;
            //        break;
            //    case Sprite.Frame.A:
            //        Main.GameSpeed.TimerFrame2.Enabled = true;
            //        break;
            //    case Sprite.Frame.B:
            //        Main.GameSpeed.TimerFrame1.Enabled = true;
            //        break;
            //}
        }

        public void DrawA()
        {
            //ClearPreFrame();
            //sprPos = Main.SIF.getSprPos;
            //sprDir = Main.SIF.getSprDir;
            //Main.SIF.setSprPrePos = sprPos;
            //Main.SIF.setSprPreImg = sprImg;
            //Main.SIF.setSprPreFrm = Sprite.Frame.A;

            //switch (sprDir)
            //{
            //    case Sprite.Direction.Up:
            //        //ClearPreFrame()
            //        sprPos.Y -= (int)dist;
            //        sprImg = dirUp_A;
            //        Main.myGraphics.DrawImage(sprImg, sprPos);
            //        break;
            //    case Sprite.Direction.Down:
            //        //ClearPreFrame()
            //        sprPos.Y += (int)dist;
            //        sprImg = dirDown_A;
            //        Main.myGraphics.DrawImage(sprImg, sprPos);
            //        break;
            //    case Sprite.Direction.Left:
            //        //ClearPreFrame()
            //        sprPos.X -= (int)dist;
            //        sprImg = dirLeft_A;
            //        Main.myGraphics.DrawImage(sprImg, sprPos);
            //        break;
            //    case Sprite.Direction.Right:
            //        //ClearPreFrame()
            //        sprPos.X += (int)dist;
            //        sprImg = dirRight_A;
            //        Main.myGraphics.DrawImage(sprImg, sprPos);
            //        break;
            //}

            //Main.GameSpeed.TimerFrame1.Enabled = false;
            //Main.GameSpeed.TimerFrame0.Enabled = true;
            //Main.SIF.setSprPos() = sprPos;
        }

        public void DrawB()
        {
            //ClearPreFrame();
            //sprPos = Main.SIF.getSprPos;
            //sprDir = Main.SIF.getSprDir;
            //Main.SIF.setSprPrePos = sprPos;
            //Main.SIF.setSprPreImg = sprImg;
            //Main.SIF.setSprPreFrm = Sprite.Frame.B;

            //switch (sprDir)
            //{
            //    case Sprite.Direction.Up:
            //        //ClearPreFrame()
            //        sprPos.Y -= (int)dist;
            //        sprImg = dirUp_B;
            //        Main.myGraphics.DrawImage(sprImg, sprPos);
            //        break;
            //    case Sprite.Direction.Down:
            //        //ClearPreFrame()
            //        sprPos.Y += (int)dist;
            //        sprImg = dirDown_B;
            //        Main.myGraphics.DrawImage(sprImg, sprPos);
            //        break;
            //    case Sprite.Direction.Left:
            //        //ClearPreFrame()
            //        sprPos.X -= (int)dist;
            //        sprImg = dirLeft_B;
            //        Main.myGraphics.DrawImage(sprImg, sprPos);
            //        break;
            //    case Sprite.Direction.Right:
            //        //ClearPreFrame()
            //        sprPos.X += (int)dist;
            //        sprImg = dirRight_B;
            //        Main.myGraphics.DrawImage(sprImg, sprPos);
            //        break;
            //}

            //Main.GameSpeed.TimerFrame2.Enabled = false;
            //Main.GameSpeed.TimerFrame0.Enabled = true;
            //Main.SIF.setSprPos() = sprPos;
        }

        private void ClearPreFrame()
        {
            //sprPreImg = Main.SIF.getSprPreIm;

            //clrPreImg.Width = sprPreImg.Width;
            //clrPreImg.Height = sprPreImg.Height;
            //clrPreImg.Y = sprPrePos.Y;
            //clrPreImg.X = sprPrePos.X;
            //Main.myGraphics.FillRectangle(Brushes.White, clrPreImg);
        }

        public string[] getImageArray
        {
            get { return imageArray; }
        }
    }
}
