package Bean;
import java.io.Serializable;

public class UserInfoBean implements Serializable{
    private String userId ="Guest";
    private String name = "Guest";
    private int level = 1;
    private int balance = 0;
    public String getUserId(){
        return userId;
    }
    public String getName(){
        return name;
    }
    public int getLevel(){
        return level;
    }
    public int getBalance(){
        return balance;
    }
    public void setUserId(String userId){
        this.userId = userId;
    }
    public void setName(String name){
        this.name = name;
    }
    public void setLevel(int level){
        this.level = level;
    }
    public void setBalance(int balance){
        this.balance = balance;
    }
}
