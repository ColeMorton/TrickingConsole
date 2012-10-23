using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrickingFormsProject.Actions
{
    public class Stand
    {
        public Image _dirUp, _dirDown, _dirLeft, _dirRight;
        private string[] _imageArray;
        private Sprite.Direction _sprDir;
        private const double _dist = 5.88;
        private Image _sprPreImg;
        private Image _sprImg;

        public Stand(string[] imageArray)
        {
            _imageArray = imageArray;
            _dirUp = Image.FromFile(_imageArray[0]);
            _dirDown = Image.FromFile(_imageArray[1]);
            _dirLeft = Image.FromFile(_imageArray[2]);
            _dirRight = Image.FromFile(_imageArray[3]);
        }

        public void Draw0(Point sprPos, Sprite.Direction sprDir)
        {
            //switch (sprDir)
            //{
            //    case Sprite.Direction.Up:
            //        _sprImg = _dirUp;
            //        Main.myGraphics.DrawImage(_sprImg, sprPos);
            //        break;

            //    case Sprite.Direction.Down:
            //        _sprImg = _dirDown;
            //        Main.myGraphics.DrawImage(_sprImg, sprPos);
            //        break;

            //    case Sprite.Direction.Left:
            //        _sprImg = _dirLeft;
            //        Main.myGraphics.DrawImage(_sprImg, sprPos);
            //        break;

            //    case Sprite.Direction.Right:
            //        _sprImg = _dirRight;
            //        Main.myGraphics.DrawImage(_sprImg, sprPos);
            //        break;
            //}

            //Main.SIF.setSprPreImg() = _sprImg;
            //Main.GameSpeed.TimerFrame0.Enabled = false;
        }

        public string[] getImageArray
        {
            get
            {
                return _imageArray;
            }
        }

        public Image getSprImg { get; set; }
    }
}