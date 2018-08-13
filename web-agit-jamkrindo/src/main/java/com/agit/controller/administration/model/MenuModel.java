/**
 * 
 */
package com.agit.controller.administration.model;

import java.util.List;

import com.agit.entity.security.SecComponent;
import com.agit.entity.security.SecMenu;
/**
*
* @author Ridwan
*/

public class MenuModel {
	private SecMenu menu;
	private List<MenuModel> childs;
	private List<SecComponent> components;
	
	public SecMenu getMenu() {
		return menu;
	}
	public void setMenu(SecMenu menu) {
		this.menu = menu;
	}
	public List<MenuModel> getChilds() {
		return childs;
	}
	public void setChilds(List<MenuModel> childs) {
		this.childs = childs;
	}
	public List<SecComponent> getComponents() {
		return components;
	}
	public void setComponents(List<SecComponent> components) {
		this.components = components;
	}
}
