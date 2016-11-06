package Servlet;

import Connector.JdbcConnector;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by Rex on 10/26/16.
 */
@WebServlet(name = "LoginServlet",urlPatterns = {"/LoginServlet"})
public class LoginServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException,SQLException {
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin","*");

        try (PrintWriter out = response.getWriter()) {
            String Id = request.getParameter("id");
            String Name= request.getParameter("name");
            int Level = 1;
            int Balance = 0;
            if(!(Id.equalsIgnoreCase("Guest"))){
                String query = "select * from account where Id = '" + Id + "'";
                ResultSet rs = JdbcConnector.excuteQuery(query);
                if (rs.first()) {
                    Level = rs.getInt("Level");
                    Balance = rs.getInt("Balance");
                    JdbcConnector.closeDatabase();
                } else {
                    JdbcConnector.closeDatabase();
                    query = "INSERT INTO account VALUES ('" + Id + "', '" + Name + "','" + 1 + "','" + 0 + "')";
                    boolean r1 = JdbcConnector.excuteUpdate(query);
                    if (r1) {
                        out.println("Add User to acct list successfully");
                    }
                }
            }
            Bean.UserInfoBean UserInfo = new Bean.UserInfoBean();
            UserInfo.setUserId(Id);
            UserInfo.setName(Name);
            UserInfo.setLevel(Level);
            UserInfo.setBalance(Balance);
            request.setAttribute("UserInfo",UserInfo);
            request.getRequestDispatcher("Game.jsp").forward(request, response);
        }
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (SQLException ex) {
            Logger.getLogger(LoginServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (SQLException ex) {
            Logger.getLogger(LoginServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
