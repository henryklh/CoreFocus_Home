using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;

/// <summary>
/// Summary description for eWayAuthentication
/// </summary>
public class eWayAuthentication : ICredentials
{
	public string Username { get { return username; } set { username = value; } }
    public string Password { get { return password; } set { password = value; } }

    private string username;
    private string password;

	public eWayAuthentication()
	{
        username = string.Empty;
        password = string.Empty;
	}

    public eWayAuthentication(string username, string password)
    {
        Username = username;
        Password = password;
    }

    public static ICredentials GetCredentials(string username, string password)
    {
        eWayAuthentication authentication = new eWayAuthentication(username, password);
        return (ICredentials)authentication;
    }

    public NetworkCredential GetCredential(Uri uri, string authType)
    {
        return new NetworkCredential(Username, Password);
    }
}