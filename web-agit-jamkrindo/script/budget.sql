/*
Navicat PGSQL Data Transfer

Source Server         : POSTGRE
Source Server Version : 90309
Source Host           : localhost:5432
Source Database       : transnom
Source Schema         : budget

Target Server Type    : PGSQL
Target Server Version : 90309
File Encoding         : 65001

Date: 2018-08-07 08:44:30
*/


-- ----------------------------
-- Sequence structure for seq_budget
-- ----------------------------
DROP SEQUENCE IF EXISTS "cms"."seq_cms";
CREATE SEQUENCE "cms"."seq_cms"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9999999
 START 5
 CACHE 1;

-- ----------------------------
-- Sequence structure for seq_component
-- ----------------------------
DROP SEQUENCE IF EXISTS "cms"."seq_component";
CREATE SEQUENCE "cms"."seq_component"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9999
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for seq_departemen
-- ----------------------------
DROP SEQUENCE IF EXISTS "cms"."seq_departemen";
CREATE SEQUENCE "cms"."seq_departemen"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9999
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for seq_lookup
-- ----------------------------
DROP SEQUENCE IF EXISTS "cms"."seq_lookup";
CREATE SEQUENCE "cms"."seq_lookup"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9999
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for seq_m_param_config
-- ----------------------------
DROP SEQUENCE IF EXISTS "cms"."seq_m_param_config";
CREATE SEQUENCE "cms"."seq_m_param_config"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 999999999999999999
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for seq_mapping
-- ----------------------------
DROP SEQUENCE IF EXISTS "cms"."seq_mapping";
CREATE SEQUENCE "cms"."seq_mapping"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9999
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for seq_role
-- ----------------------------
DROP SEQUENCE IF EXISTS "cms"."seq_role";
CREATE SEQUENCE "cms"."seq_role"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9999
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for seq_role_dtl
-- ----------------------------
DROP SEQUENCE IF EXISTS "cms"."seq_role_dtl";
CREATE SEQUENCE "cms"."seq_role_dtl"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9999
 START 38
 CACHE 1;
SELECT setval('"cms"."seq_role_dtl"', 38, true);

-- ----------------------------
-- Sequence structure for seq_user
-- ----------------------------
DROP SEQUENCE IF EXISTS "cms"."seq_user";
CREATE SEQUENCE "cms"."seq_user"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9999
 START 1
 CACHE 1;

-- ----------------------------
-- Table structure for lookup
-- ----------------------------
DROP TABLE IF EXISTS "cms"."lookup";
CREATE TABLE "cms"."lookup" (
"lookup_id" int8 NOT NULL,
"lookup_type" varchar(50) COLLATE "default",
"lookup_value" varchar(50) COLLATE "default",
"lookup_description" varchar(100) COLLATE "default",
"display_flag" char(1) COLLATE "default" DEFAULT 'Y'::bpchar,
"creation_date" date,
"created_by" int8,
"last_updated_date" date,
"last_updated_by" int8
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of lookup
-- ----------------------------
INSERT INTO "cms"."lookup" VALUES ('1', 'APPROVE', 'APPROVE', 'Approve', 'Y', null, null, null, null);
INSERT INTO "cms"."lookup" VALUES ('2', 'APPROVE', 'PENDING', 'Pending', 'Y', null, null, null, null);
INSERT INTO "cms"."lookup" VALUES ('3', 'APPROVE', 'REJECT', 'Reject', 'Y', null, null, null, null);

-- ----------------------------
-- Table structure for m_component
-- ----------------------------
DROP TABLE IF EXISTS "cms"."m_component";
CREATE TABLE "cms"."m_component" (
"menu_comp_id" int4 NOT NULL,
"menu_id" int4,
"menu_comp_name" varchar(20) COLLATE "default",
"menu_comp_desc" varchar(255) COLLATE "default",
"menu_comp_icon" varchar(50) COLLATE "default"
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of m_component
-- ----------------------------
INSERT INTO "cms"."m_component" VALUES ('1', '1', 'VIEW', 'VIEW', null);
INSERT INTO "cms"."m_component" VALUES ('11', '10', 'VIEW', 'VIEW', null);
INSERT INTO "cms"."m_component" VALUES ('12', '10', 'EDIT', 'EDIT', null);
INSERT INTO "cms"."m_component" VALUES ('13', '10', 'NEW', 'NEW', null);
INSERT INTO "cms"."m_component" VALUES ('14', '10', 'DELETE', 'DELETE', null);
INSERT INTO "cms"."m_component" VALUES ('15', '11', 'VIEW', 'VIEW', null);
INSERT INTO "cms"."m_component" VALUES ('16', '11', 'EDIT', 'EDIT', null);
INSERT INTO "cms"."m_component" VALUES ('17', '11', 'NEW', 'NEW', null);
INSERT INTO "cms"."m_component" VALUES ('18', '11', 'DELETE', 'DELETE', null);
INSERT INTO "cms"."m_component" VALUES ('19', '12', 'VIEW', 'VIEW', null);
INSERT INTO "cms"."m_component" VALUES ('20', '12', 'EDIT', 'EDIT', null);
INSERT INTO "cms"."m_component" VALUES ('21', '12', 'NEW', 'NEW', null);
INSERT INTO "cms"."m_component" VALUES ('22', '12', 'DELETE', 'DELETE', null);
INSERT INTO "cms"."m_component" VALUES ('23', '13', 'VIEW', 'VIEW', null);
INSERT INTO "cms"."m_component" VALUES ('24', '13', 'EDIT', 'EDIT', null);
INSERT INTO "cms"."m_component" VALUES ('25', '13', 'NEW', 'NEW', null);
INSERT INTO "cms"."m_component" VALUES ('26', '13', 'DELETE', 'DELETE', null);
INSERT INTO "cms"."m_component" VALUES ('27', '14', 'VIEW', 'VIEW', null);

-- ----------------------------
-- Table structure for m_menu
-- ----------------------------
DROP TABLE IF EXISTS "cms"."m_menu";
CREATE TABLE "cms"."m_menu" (
"menu_id" int4 NOT NULL,
"menu_name" varchar(50) COLLATE "default",
"menu_desc" varchar(50) COLLATE "default",
"menu_url" varchar(255) COLLATE "default",
"menu_icon" varchar(50) COLLATE "default",
"menu_parent_id" int4,
"menu_enabled" int4,
"menu_seq_no" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of m_menu
-- ----------------------------
INSERT INTO "cms"."m_menu" VALUES ('1', 'ADMINISTRATION', 'Adminstration', null, 'user', null, '1', '1');
INSERT INTO "cms"."m_menu" VALUES ('10', 'USER_MANAGEMENT', 'User Management', '/administration/user/', 'user', '1', '1', '1');
INSERT INTO "cms"."m_menu" VALUES ('11', 'ROLE_MANAGEMENT', 'Role Management', '/administration/role/', 'sitemap', '1', '1', '2');
INSERT INTO "cms"."m_menu" VALUES ('12', 'PARAM_CONFIG', 'Param Config', '/administration/param/', 'cog', '1', '1', '3');
INSERT INTO "cms"."m_menu" VALUES ('13', 'MENU', 'Menu', '/administration/menu/', 'list', '1', '1', '4');
INSERT INTO "cms"."m_menu" VALUES ('14', 'CHAT', 'Chatting', '/administration/chat/', 'comment', '1', '1', '5');

-- ----------------------------
-- Table structure for m_param_config
-- ----------------------------
DROP TABLE IF EXISTS "cms"."m_param_config";
CREATE TABLE "cms"."m_param_config" (
"param_id" int8 NOT NULL,
"param_name" varchar(50) COLLATE "default",
"param_value" varchar(50) COLLATE "default",
"param_desc" varchar(255) COLLATE "default",
"app_type" varchar(10) COLLATE "default",
"created_by" int8,
"created_date" timestamp(6),
"last_updated_by" int8,
"last_updated_date" timestamp(6)
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of m_param_config
-- ----------------------------

-- ----------------------------
-- Table structure for m_role
-- ----------------------------
DROP TABLE IF EXISTS "cms"."m_role";
CREATE TABLE "cms"."m_role" (
"role_id" int8 NOT NULL,
"role_name" varchar(120) COLLATE "default",
"role_desc" varchar(255) COLLATE "default",
"created_date" timestamp(6),
"created_by" int8,
"last_updated_date" timestamp(6),
"last_updated_by" int8
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of m_role
-- ----------------------------
INSERT INTO "cms"."m_role" VALUES ('1', 'ROLE_SUPERADMIN', 'Super Administration Role', null, null, null, null);
INSERT INTO "cms"."m_role" VALUES ('2', 'ROLE_USER', 'User Role', null, null, null, null);
INSERT INTO "cms"."m_role" VALUES ('3', 'ROLE_MANAGER', 'Manager Role', null, null, null, null);

-- ----------------------------
-- Table structure for m_role_dtl
-- ----------------------------
DROP TABLE IF EXISTS "cms"."m_role_dtl";
CREATE TABLE "cms"."m_role_dtl" (
"role_dtl_id" int8 NOT NULL,
"role_id" int8 NOT NULL,
"menu_comp_id" int4,
"created_date" timestamp(6),
"created_by" int8,
"last_updated_date" timestamp(6),
"last_updated_by" int8
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of m_role_dtl
-- ----------------------------
INSERT INTO "cms"."m_role_dtl" VALUES ('26', '1', '1', '2018-05-16 10:19:26.164', '1', null, null);
INSERT INTO "cms"."m_role_dtl" VALUES ('27', '1', '11', '2018-05-16 10:19:26.169', '1', null, null);
INSERT INTO "cms"."m_role_dtl" VALUES ('28', '1', '12', '2018-05-16 10:19:26.17', '1', null, null);
INSERT INTO "cms"."m_role_dtl" VALUES ('29', '1', '13', '2018-05-16 10:19:26.171', '1', null, null);
INSERT INTO "cms"."m_role_dtl" VALUES ('30', '1', '14', '2018-05-16 10:19:26.172', '1', null, null);
INSERT INTO "cms"."m_role_dtl" VALUES ('31', '1', '15', '2018-05-16 10:19:26.174', '1', null, null);
INSERT INTO "cms"."m_role_dtl" VALUES ('32', '1', '16', '2018-05-16 10:19:26.175', '1', null, null);
INSERT INTO "cms"."m_role_dtl" VALUES ('33', '1', '17', '2018-05-16 10:19:26.176', '1', null, null);
INSERT INTO "cms"."m_role_dtl" VALUES ('34', '1', '18', '2018-05-16 10:19:26.176', '1', null, null);
INSERT INTO "cms"."m_role_dtl" VALUES ('35', '1', '23', '2018-05-16 10:19:26.184', '1', null, null);
INSERT INTO "cms"."m_role_dtl" VALUES ('36', '1', '24', '2018-05-16 10:19:26.189', '1', null, null);
INSERT INTO "cms"."m_role_dtl" VALUES ('37', '1', '25', '2018-05-16 10:19:26.191', '1', null, null);
INSERT INTO "cms"."m_role_dtl" VALUES ('38', '1', '26', '2018-05-16 10:19:26.192', '1', null, null);
INSERT INTO "cms"."m_role_dtl" VALUES ('39', '1', '27', '2018-07-11 13:15:20', '1', null, null);

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS "cms"."message";
CREATE TABLE "cms"."message" (
"id" int8 NOT NULL,
"author" varchar(255) COLLATE "default",
"body" varchar(255) COLLATE "default",
"created" timestamp(6)
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of message
-- ----------------------------

-- ----------------------------
-- Table structure for sec_user
-- ----------------------------
DROP TABLE IF EXISTS "cms"."sec_user";
CREATE TABLE "cms"."sec_user" (
"usr_id" int8 NOT NULL,
"usr_loginname" varchar(30) COLLATE "default",
"usr_password" varchar(32) COLLATE "default",
"usr_lastname" varchar(50) COLLATE "default",
"usr_firstname" varchar(50) COLLATE "default",
"usr_email" varchar(200) COLLATE "default",
"usr_phone" varchar(30) COLLATE "default",
"creation_date" timestamp(6),
"created_by" int8,
"last_updated_date" timestamp(6),
"last_updated_by" int8,
"usr_type" varchar(50) COLLATE "default",
"departement_id" int8
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of sec_user
-- ----------------------------
INSERT INTO "cms"."sec_user" VALUES ('1', 'admin', '5f4dcc3b5aa765d61d8327deb882cf99', 'admin', 'admin', null, null, null, null, null, null, 'ADMIN', '1');

-- ----------------------------
-- Table structure for t_mapping_userole
-- ----------------------------
DROP TABLE IF EXISTS "cms"."t_mapping_userole";
CREATE TABLE "cms"."t_mapping_userole" (
"userrole_id" int8 NOT NULL,
"user_id" int8 NOT NULL,
"role_id" int8 NOT NULL,
"created_date" timestamp(6),
"created_by" int8,
"last_updated_date" timestamp(6),
"last_updated_by" int8
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of t_mapping_userole
-- ----------------------------
INSERT INTO "cms"."t_mapping_userole" VALUES ('1', '1', '1', null, null, null, null);

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------

-- ----------------------------
-- Uniques structure for table m_menu
-- ----------------------------
ALTER TABLE "cms"."m_menu" ADD UNIQUE ("menu_id");

-- ----------------------------
-- Primary Key structure for table message
-- ----------------------------
ALTER TABLE "cms"."message" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table sec_user
-- ----------------------------
ALTER TABLE "cms"."sec_user" ADD UNIQUE ("usr_id");
