<%@page import="com.savvion.BizSolo.Server.*,com.savvion.BizSolo.beans.*,java.util.*" contentType="text/html;charset=UTF-8"%>
<%@page import="com.savvion.sbm.bizsolo.util.session.*,java.net.*"%>
<%! String fid = null; %>
<% 
		if (VirtualSessionManager.isEnabled()) {
		   fid = request.getParameter(BizSoloRequest.BSS_FIID);
			if (fid == null) {
				response.sendRedirect(VirtualSessionManager.makeItselfSessionURL(request));
				return;
		}
		 }
%>
<%@page errorPage="/BizSolo/common/jsp/expcontroller.jsp" %>
<%@taglib uri="/BizSolo/common/tlds/bizsolo.tld" prefix="bizsolo"%>
<%@taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<jsp:useBean id="bean" class="com.savvion.BizSolo.beans.Bean" scope="session"/>
<jsp:useBean id="factoryBean" class="com.savvion.BizSolo.beans.EPFactoryBean" scope="session"/>
<jsp:useBean id="bizSite" class="com.savvion.sbm.bpmportal.bizsite.api.BizSiteBean" scope="session"/>

<%! String _PageName = "Start"; %>
<%! String __webAppName = "Documentos"; %>
<%! int res=-10; %>
<bizsolo:ifCrtWS name="Start" isDefault="true" >
<bizsolo:initApp name="Documentos" />
<bizsolo:getParentData />
<bizsolo:if test="<%=request.getParameter(\"workitemName\")!=null %>" >
<bizsolo:executeAction wsName="" epClassName="com.savvion.BizSolo.beans.PAKGetDS" perfMethod="commit" />
</bizsolo:if>
<bizsolo:checkSecure />
<bizsolo:redirectURL page="Start.jsp?crtApp=Documentos&crtPage=Activity1" />
</bizsolo:ifCrtWS>



<%com.progress.lang.Character usuario=bean.getPropCharacter("usuario");
com.progress.lang.Integer idreturn=bean.getPropInteger("idreturn");
com.progress.lang.Character estado=bean.getPropCharacter("estado");
com.progress.lang.Character nombrearchivo=bean.getPropCharacter("nombrearchivo");
com.progress.lang.LongChar datos=bean.getPropLongChar("datos");
com.progress.lang.Character estado1=bean.getPropCharacter("estado1");
com.progress.lang.Integer returnId=bean.getPropInteger("returnId");
com.progress.lang.LongChar ListaArchivos=bean.getPropLongChar("ListaArchivos");
com.progress.lang.LongChar ArchivoLC=bean.getPropLongChar("ArchivoLC");
%>




<bizsolo:ifCrtWS name="Activity1" >
<bizsolo:choose >
<bizsolo:when test="<%=\"procReq\".equals(request.getParameter(\"activityMode\")) %>" >
<bizsolo:setDS name="ArchivoLC,ListaArchivos,nombrearchivo,estado1,returnId,datos,estado,idreturn,usuario"/><bizsolo:choose >
<bizsolo:when test="<%=\"Connection 11\".equals(request.getParameter(\"SB_Name\")) || \"285694594\".equals(request.getParameter(\"SB_Name\")) %>" >
<bizsolo:forwardURL page="Start.jsp?crtApp=Documentos&crtPage=OEAdapter_2" />
</bizsolo:when>
</bizsolo:choose>
<bizsolo:choose >
<bizsolo:when test="<%=\"Connection 8\".equals(request.getParameter(\"SB_Name\")) || \"2087425942\".equals(request.getParameter(\"SB_Name\")) %>" >
<bizsolo:forwardURL page="Start.jsp?crtApp=Documentos&crtPage=OEAdapter" />
</bizsolo:when>
</bizsolo:choose>
<bizsolo:choose >
<bizsolo:when test="<%=\"Connection 7\".equals(request.getParameter(\"SB_Name\")) || \"2087425941\".equals(request.getParameter(\"SB_Name\")) %>" >
<bizsolo:forwardURL page="Start.jsp?crtApp=Documentos&crtPage=End_1" />
</bizsolo:when>
</bizsolo:choose>
<bizsolo:choose >
<bizsolo:when test="<%=\"Connection 2\".equals(request.getParameter(\"SB_Name\")) || \"2087425936\".equals(request.getParameter(\"SB_Name\")) %>" >
<bizsolo:forwardURL page="Start.jsp?crtApp=Documentos&crtPage=OEAdapter_3" />
</bizsolo:when>
</bizsolo:choose>
</bizsolo:when>
<bizsolo:otherwise >
<bizsolo:redirectURL page="Activity1.jsp" />
</bizsolo:otherwise>
</bizsolo:choose>
</bizsolo:ifCrtWS>



<bizsolo:ifCrtWS name="End_1" >
<bizsolo:transferDS />
<bizsolo:setParentData />
<% /* Workaround, retAddr will disappear in the future */ %>
<% String retAddr = bean.getPropString("returnPage"); %>
<% if (bean.getPropString(PublicResources.MODE) == null && bean.getPropString(PublicResources.IS_BIZSOLO_SUBPROCESS)==null)
        session.setAttribute(VirtualSessionManager.ATTR_NEED_CLEANUP, "true");%><% if(retAddr != null) { %>
  <bizsolo:redirectURL page="<%= retAddr %>" />
<% } %>
</bizsolo:ifCrtWS>



<bizsolo:ifCrtWS name="OEAdapter" >
<bizsolo:executeAction wsName="OEAdapter" epClassName="com.savvion.sbm.adapters.oe.OEAdapter" perfMethod="execute" dsi="usuario" dso="ListaArchivos,idreturn,estado" />
<bizsolo:forwardURL page="Start.jsp?crtApp=Documentos&crtPage=Activity1" />
</bizsolo:ifCrtWS>



<bizsolo:ifCrtWS name="OEAdapter_2" >
<bizsolo:executeAction wsName="OEAdapter 2" epClassName="com.savvion.sbm.adapters.oe.OEAdapter" perfMethod="execute" dsi="usuario,nombrearchivo" dso="idreturn,ArchivoLC,estado" />
<bizsolo:forwardURL page="Start.jsp?crtApp=Documentos&crtPage=Activity1" />
</bizsolo:ifCrtWS>



<bizsolo:ifCrtWS name="OEAdapter_3" >
<bizsolo:executeAction wsName="OEAdapter 3" epClassName="com.savvion.sbm.adapters.oe.OEAdapter" perfMethod="execute" dsi="usuario,nombrearchivo" dso="returnId,ArchivoLC,estado" />
<bizsolo:forwardURL page="Start.jsp?crtApp=Documentos&crtPage=Activity1" />
</bizsolo:ifCrtWS>
