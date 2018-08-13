package com.agit.entity.security;

import java.io.Serializable;

import com.agit.entity.Entity;

public class SecComponent implements Serializable, Entity {
	/**
	 *
	 * @author Ridwan
	 */
	private static final long serialVersionUID = 319169014234109029L;
	private Long id;
    private String name;
    private String description;
    private String icon;
    private SecMenu menu;
    
    public boolean isNew() {
        return this.getId() == null;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public SecMenu getMenu() {
		return menu;
	}

	public void setMenu(SecMenu menu) {
		this.menu = menu;
	}

	public boolean equals(SecComponent secComponent) {
        return getId().equals(secComponent.getId());
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }

        if (obj instanceof SecComponent) {
            SecComponent secComponent = (SecComponent) obj;
            return equals(secComponent);
        }

        return false;
    }
}
