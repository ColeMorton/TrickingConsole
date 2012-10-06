using System;
using System.Web.Mvc;

namespace Tricking.Mvc.Controllers
{
    public class ShellController : Controller
    {
        public bool Contains(string key)
        {
            return Session[key] != null;
        }

        public T Get<T>(string key)
        {
            var type = typeof (T).ToString();
            if (Session[key] == null)
            {
                var obj = (T)Activator.CreateInstance(Type.GetType(type));
                Session[key] = obj;
            }

            return (T)Session[key];
        }

        public void Set<T>(string key, object value)
        {
            Get<T>(key);
            Session[key] = (T)value;
        }
    }
}