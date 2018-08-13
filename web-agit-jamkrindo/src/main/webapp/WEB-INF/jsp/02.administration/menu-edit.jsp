<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html>
    <head>
        <title>Menu | Create/Edit</title>
        <script type="text/javascript">
            $(document).ready(function () {
                $("#menuEnable").bootstrapSwitch();
                $("#menuEnable").on('switch-change', function (e, data) {
                    value = data.value;
                    if (value)
                        $("#hiddenMenuEnabled").val("1");
                    else
                        $("#hiddenMenuEnabled").val("0");
                });

                popoverFunction.getMenuPopup({
                    url: "${pageContext.request.contextPath}",
                    classMain: "showMenuPopup",
                    modalTitle: "Menu Parent List",
                    hiddenId: "id",
                    varValue: "name"
                });

                $("#btn-reset").click(function () {
                    $('#menuName').val($('#default_name').val());
                    $('#menuDescription').val($('#default_description').val());
                    $('#menuUrl').val($('#default_url').val());
                    $("input[type=\"text\"]").removeClass("success");
                    $("label.error").remove();
                    $("input[type=\"text\"], input[type=\"email\"], input[type=\"tel\"], input[type=\"password\"]").removeClass("error");
                });
            });
        </script>
    </head>
    <body>
        <div class="content">
            <div class="row">
                <div class="col-lg-6 ">
                    <div class="main-header">
                        <ul class="breadcrumb">
                            <li><i class="fa fa-home"></i></li>
                            <li>Administration</li>
                            <li><a href="${pageContext.request.contextPath}/administration/menu/">Menu</a></li>
                            <li class="active">Create/Edit</li>
                        </ul>
                        <h3 style="
                            color: white;"> <i class="fa fa-plus"></i> Create/Edit Menu </h3> <em>Administration</em>
                    </div>
                </div>
                <div class="col-lg-6 ">
                    <div class="top-content-button">
                        <ul class="list-inline quick-access">
                            <li>
                                <button id="btn-reset"class="btn btn-default" type="button"><i class="fa fa-refresh"></i> Reset Form</button>
                            </li>
                            <li>
                                <button id="btn-save" class="btn btn-custom-secondary" type="button"><i class="fa fa-save"></i> Save Data</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <form class="form-horizontal" role="form" method="post" name="menu">
                <input type="hidden" name="id" value="${menu.id}">
                <input type="hidden" id="default_name" value="${menu.name}">
                <input type="hidden" id="default_description" value="${menu.description}">
                <input type="hidden" id="default_url" value="${menu.url}">
                <input type="hidden" id="default_enabled" value="${menu.enabled}">
                <input type="hidden" id="default_parent_id" value="${menu.parent.id}">
                <div class="row">
                    <div class="col-md-12">
                        <div class="widget">
                            <div class="widget-header">
                                <h3><i class="fa fa-list fa-fw"></i> Menu</h3>
                                <div class="widget-header-toolbar">
                                    <div class="control-inline toolbar-item-group">
                                        <span class="control-title"><i class="fa fa-lightbulb-o"></i>&nbsp;&nbsp;Active Status&nbsp;:&nbsp;</span>
                                        <input id="menuEnable" type="checkbox">
                                        <input type="hidden" name="enabled" id="hiddenMenuEnabled" value="${menu.enabled}">
                                    </div>
                                </div>
                            </div>
                            <div class="widget-content form">
                                <div class="form-body">
                                    <div class="form-body">
                                        <div class="form-group">
                                            <label class="col-md-3 control-label">Menu Name <span class="required">*</span></label>
                                            <div class="col-md-4">
                                                <div>
                                                    <input id="menuName" type="text" class="form-control required" name="name" value="${menu.name}" placeholder="Menu Name"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label  class="col-md-3 control-label">Description <span class="required">*</span></label>
                                            <div class="col-md-4">
                                                <div>
                                                    <input id="menuDescription" type="text" class="form-control required" name="description" value="${menu.description}" placeholder="Description"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label  class="col-md-3 control-label">Url <span class="required">*</span></label>
                                            <div class="col-md-4">
                                                <div>
                                                    <input id="menuUrl" type="text" class="form-control required" name="url" value="${menu.url}" placeholder="Menu Url"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-3 control-label">Parent Menu <span class="required">*</span></label>
                                            <div class="col-md-4">
                                                <input type="hidden" name="parentId" id="parentId" value="${menu.parent.id}">
                                                <div class="input-group">
                                                    <input name="menuDesc" id="menuDesc" type="text" style="cursor: pointer;"  class="form-control showMenuPopup" readonly="readonly" value="${menu.parent.id}" />
                                                    <span class="input-group-addon"><i class="fa fa-search"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </body>
</html>