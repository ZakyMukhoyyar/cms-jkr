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
public class MenuComponentModel {
	private SecMenu menu;
	private List<SecComponent> components;
	
	public SecMenu getMenu() {
		return menu;
	}
	public void setMenu(SecMenu menu) {
		this.menu = menu;
	}
	public List<SecComponent> getComponents() {
		return components;
	}
	public void setComponents(List<SecComponent> components) {
		this.components = components;
	}
}
