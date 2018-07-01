var paths = {};

paths.assetsDir         = '_assets/';
paths.jekyllDir         = '';
paths.jekyllAssetsDir   = 'assets/';
paths.siteDir           = '_site/';
paths.siteAssetsDir     = '_site/assets/';

paths.postFolderName    = '_posts';
paths.draftFolderName   = '_drafts';
paths.fontFolderName    = 'fonts';
paths.imageFolderName   = 'img';
paths.scriptFolderName  = 'js';
paths.stylesFolderName  = 'styles';

paths.sassFiles   = paths.assetsDir + paths.stylesFolderName;
paths.jsFiles     = paths.assetsDir + paths.scriptFolderName;
paths.imageFiles  = paths.assetsDir + paths.imageFolderName;
paths.fontFiles   = paths.assetsDir + paths.fontFolderName;

paths.jekyllPostFiles   = paths.jekyllDir         + paths.postFolderName;
paths.jekyllDraftFiles  = paths.jekyllDir         + paths.draftFolderName;
paths.jekyllCssFiles    = paths.jekyllAssetsDir   + paths.stylesFolderName;
paths.jekyllJsFiles     = paths.jekyllAssetsDir   + paths.scriptFolderName;
paths.jekyllImageFiles  = paths.jekyllAssetsDir   + paths.imageFolderName;
paths.jekyllFontFiles   = paths.jekyllAssetsDir   + paths.fontFolderName;

paths.siteCssFiles      = paths.siteAssetsDir + paths.stylesFolderName;
paths.siteJsFiles       = paths.siteAssetsDir + paths.scriptFolderName;
paths.siteImageFiles    = paths.siteAssetsDir + paths.imageFolderName;
paths.siteFontFiles     = paths.siteAssetsDir + paths.fontFolderName;

paths.sassPattern     = '/**/*.scss';
paths.jsPattern       = '/**/*.js';
paths.imagePattern    = '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)';
paths.markdownPattern = '/**/*.+(md|MD|markdown|MARKDOWN)';
paths.htmlPattern     = '/**/*.html';
paths.xmlPattern      = '/**/*.xml';

paths.jekyllPostFilesGlob   = paths.jekyllPostFiles   + paths.markdownPattern;
paths.jekyllDraftFilesGlob  = paths.jekyllDraftFiles  + paths.markdownPattern;
paths.jekyllHtmlFilesGlob   = paths.jekyllDir         + paths.htmlPattern;
paths.jekyllXmlFilesGlob    = paths.jekyllDir         + paths.xmlPattern;
paths.jekyllImageFilesGlob  = paths.jekyllImageFiles  + paths.imagePattern;

paths.siteHtmlFilesGlob = paths.siteDir + paths.htmlPattern;
paths.imageFilesGlob = paths.imageFiles + paths.imagePattern;
paths.jsFilesGlob    = paths.jsFiles    + paths.jsPattern;
paths.sassFilesGlob  = paths.sassFiles  + paths.sassPattern;

module.exports = paths;
