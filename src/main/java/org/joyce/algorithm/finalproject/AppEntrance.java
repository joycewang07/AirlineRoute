package org.joyce.algorithm.finalproject;

/**
 * Created by Administrator on 14-4-4.
 */
public class AppEntrance {
    public static void main(String args[]){
        java.awt.EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {
                new MainFrame().setVisible(true);
            }
        });
    }
}
