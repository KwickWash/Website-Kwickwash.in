using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
public class apiService : System.Web.Services.WebService
{

    public apiService()
    {
      
    }

    [WebMethod(EnableSession = true)]
    public string LoginUser(string Username, string Password)
    {
        try
        {
            if (Username.ToString() == "" || Password.ToString() == "")
            {
                return "Confirm your e-mail ID and Password and try again.";
            }
            else
            {
                DataTable DT = Users.ValidateUser(Username.ToString(), Password.ToString());
                if (DT.Rows.Count > 0)
                {
                    DataRow DR = DT.Rows[0];
                    HttpContext.Current.Session["ActiveUser"] = DR["Userid"].ToString();
                    string query_login = "update tbl.login set status=1 where userid='" + DR["Userid"].ToString() + "'";
                    string res = Database.Execute(query_login);
                    return "1";
                }
                else
                {
                    return "2";
                }
            }
        }
        catch (Exception ex)
        {
            return "0";
        }
    }


    [WebMethod(EnableSession = true)]
    public int SessionTimeout()
    {
        int ret = 0;
        if (HttpContext.Current.Session["ActiveUser"] != null)
        {
            string query_login = "select * from tbl.login where userid='" + HttpContext.Current.Session["ActiveUser"].ToString() + "' and status='1'";
            DataSet ds = Database.get_DataSet(query_login);
            if (ds.Tables[0].Rows.Count > 0)
            {
                ret = Convert.ToInt32(HttpContext.Current.Session["ActiveUser"].ToString());
            }
            return ret;
        }
        return ret;
    }

    [WebMethod(EnableSession = true)]
    public int SessionLogout()
    {
        if (HttpContext.Current.Session["ActiveUser"] != null)
        {
            string query_login = "update tbl.login set status=0 where userid='" + HttpContext.Current.Session["ActiveUser"].ToString() + "'";
            string res = Database.Execute(query_login);
            HttpContext.Current.Session.Clear();
        }
        return 0;
    }
}
