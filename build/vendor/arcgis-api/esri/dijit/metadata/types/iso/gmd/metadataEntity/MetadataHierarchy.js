//>>built
require({cache:{"url:esri/dijit/metadata/types/iso/gmd/metadataEntity/templates/MetadataHierarchy.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/CodeListReference"\r\n    data-dojo-props\x3d"target:\'gmd:hierarchyLevel\',\r\n      label:\'${i18nIso.MD_Metadata.hierarchyLevel}\',minOccurs:1,maxOccurs:\'unbounded\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/maintenance/MD_ScopeCode"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n    data-dojo-props\x3d"target:\'gmd:hierarchyLevelName\',minOccurs:0,maxOccurs:\'unbounded\',\r\n      label:\'${i18nIso.MD_Metadata.hierarchyLevelName}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/GcoElement"\r\n      data-dojo-props\x3d"target:\'gco:CharacterString\'"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n    \r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/iso/gmd/metadataEntity/MetadataHierarchy","dojo/_base/declare dojo/_base/lang dojo/has ../../../../base/Descriptor ../../../../form/Element ../../../../form/iso/CodeListReference ../../../../form/iso/GcoElement ../maintenance/MD_ScopeCode dojo/text!./templates/MetadataHierarchy.html ../../../../../../kernel".split(" "),function(a,b,c,d,g,h,k,l,e,f){a=a(d,{templateString:e});c("extend-esri")&&b.setObject("dijit.metadata.types.iso.gmd.metadataEntity.MetadataHierarchy",
a,f);return a});