package org.joyce.algorithm.finalproject;

import javax.swing.*;
import java.awt.*;

/**
 * Created by Administrator on 14-4-4.
 */
public class MainFrame extends JFrame {
    public MainFrame() throws HeadlessException {
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        setMinimumSize(new Dimension(1200, 700));
        setMaximumSize(new Dimension(1200, 700));

        initComponent();

    }

    private void initComponent(){
        JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT);
        splitPane.setRightComponent(new ControlPanel());
        splitPane.setLeftComponent(new RouteMapPanel());
        splitPane.setDividerLocation(1000);
        splitPane.setEnabled(false);
        add(splitPane);
    }
}
