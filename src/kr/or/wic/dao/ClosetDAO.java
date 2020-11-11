package kr.or.wic.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import kr.or.wic.dto.ClosetDTO;
/* 
@Project : WIC
@File name : closetDAO.java
@Date : 2020.11.11
@Author : 문지연
*/
public class ClosetDAO {
	static DataSource ds;
	public Connection conn = null;
	public PreparedStatement pstmt = null;
	public ResultSet rs = null;

	static {
		InitialContext ctx;
		try {
			ctx = new InitialContext();
			Context envctx = (Context) ctx.lookup("java:comp/env");
			ds = (DataSource) envctx.lookup("/jdbc/oracle");
		} catch (Exception e) {
			System.out.println("look up Fail: " + e.getMessage());
		}
	}
	
	//createCloset
	public int createCloset() {
		System.out.println("enter create closet");
		int result = 0;
		try {
			conn=ds.getConnection();
			String sql = "insert into closet(closet_num) values(closet_seq.nextval)";
	
			pstmt=conn.prepareStatement(sql);
			result = pstmt.executeUpdate();
		}catch (SQLException e) {
			System.out.println("createCloset error");
			e.printStackTrace();
		} finally {
			try {
				pstmt.close();
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return result;
	}
}