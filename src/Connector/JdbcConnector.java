package Connector;
/**
 * Created by Rex on 10/27/16.
 */
import java.sql.*;
import java.util.Properties;

public class JdbcConnector {
    private static String mysJDBCDriver = "com.mysql.jdbc.Driver";
    private static String mysURL = "jdbc:mysql://mysql2.cs.stonybrook.edu:3306/qixchen";
    private static String mysUserID = "qixchen";
    private static String mysPassword = "108605598";
    private static Connection conn = null;
    private static Statement stmt = null;
    private static ResultSet rs = null;

    public static void connectDatabase()throws SQLException{
        try {
            Class.forName(mysJDBCDriver).newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        Properties sysprops = System.getProperties();
        sysprops.put("user", mysUserID);
        sysprops.put("password", mysPassword);
        conn = DriverManager.getConnection(mysURL,sysprops);
        System.out.println("Connecting to database...");
    }

    public static void closeDatabase() throws SQLException{
        rs.close();
        stmt.close();
        conn.close();
        System.out.println("close  database...");
    }

    public static ResultSet excuteQuery(String query)throws SQLException{
        try {
            connectDatabase();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(query);
            System.out.println("Execute Query...");
            return rs;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static boolean excuteUpdate(String query) throws SQLException{
        try {
            connectDatabase();
            stmt = conn.createStatement();
            int u = stmt.executeUpdate(query);
            System.out.println("Update Query...");
            if (u > 0) {
                closeDatabase();
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

}
