<template>
    <div>
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
                 <div id="luckysheet" class="luckysheet-content"></div>
        <!--图片-->
        <div class="file-list">
    
            <h2>File List</h2>
            <ul id="fileList"></ul>
        </div>
        <div class="preview">
            <h2>Preview</h2>
            <div id="previewContainer">
            </div>
        </div>
    
        <div class="preview-container">
            11111111111
            <table id="excelTable"></table>
        </div>
        <el-dialog :title="'232342'" :visible.sync="dialogVisible" :modal="false" width="70%" height="100%" @opened="openCallBack" @close="closeForBack" :fullscreen=false>
            <div class="docx-preview-wrap">
                <!--预览 显示-->
                <div id="preview-container">
                    <!-- word 文档-->
                    <!-- <div v-if="wordType.includes(fileType)" ref="docxContainer"></div> -->
                    <!--XLXS-->
                    <!-- <div id="luckysheet1" class="luckysheet-content"></div> -->
                    <!--图片-->
                    <!-- <div v-else-if="imgType.includes(fileType)" style="text-align: center">
                          <img :src="imgSrc"/>
                        </div> -->
                    <!--其他-->
                    <!-- <el-empty v-else description="该格式文件暂不支持预览"></el-empty> -->
                </div>
            </div>
        </el-dialog>
    
    
    </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js">

</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.min.js" integrity="sha512-3WaCYjK/lQuL0dVIRt1thLXr84Z/4Yppka6u40yEJT1QulYm9pCxguF6r8V84ndP5K03koI9hV1+zo/bUbgMtA==" crossorigin="anonymous" referrerpolicy="no-referrer">

</script>
  
<script>
//引入VueOfficeExcel组件
// import VueOfficeExcel from '@vue-office/excel'
// import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'
import LuckyExcel from "luckyexcel";
export default {
    // components: {
    //     VueOfficeExcel
    // },
    mounted() {



        // 获取压缩包文件的远程URL
        // const zipFileUrl = 'https://static.ximu.cn/test_upload_ZH12304010001_1691329465596638.zip';
        // const zipFileUrl = 'https://static.ximu.cn/test_upload_CN12307270002_1691113727894449.zip';
        // const zipFileUrl = 'https://static.ximu.cn/test_upload_ZH12304010001_1691329465596638.zip';
        const zipFileUrl = 'https://static.ximu.cn/test_upload_ZH12304010001_1691403582544798.zip';
        // const zipFileUrl = 'https://static.ximu.cn/test_upload_CN12307180003_1690797403925144.zip';

        // 创建JSZip实例
        const zip = new JSZip();

        // 通过远程URL加载压缩包文件
        JSZipUtils.getBinaryContent(zipFileUrl, function(err, data) {
            if (err) {
                console.error("Failed to load zip file:", err);
                return;
            }

            // 解压缩文件
            zip.loadAsync(data).then(function(zip) {
                // 获取压缩包中的文件列表
                const fileNames = Object.keys(zip.files);

                // 在文件列表中显示文件名
                const fileList = document.getElementById('fileList');
                fileNames.forEach(function(fileName) {
                    const listItem = document.createElement('li');
                    listItem.textContent = fileName;
                    listItem.addEventListener('click', function() {
                        previewFile(fileName);
                    });
                    fileList.appendChild(listItem);
                });
            }).catch(function(err) {
                console.error("Failed to load zip:", err);
            });
        });

        // 预览文件
        function previewFile(fileName) {
            const previewContainer = document.getElementById('previewContainer');
            previewContainer.innerHTML = '';

            // 从压缩包中获取文件内容
            zip.file(fileName).async('blob').then((blob) => {
                if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png')) {
                    // 图片文件预览
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(blob);
                    previewContainer.appendChild(img);
                } else if (fileName.endsWith('.pdf')) {
                    // PDF文件预览
                    const embed = document.createElement('embed');
                    embed.src = URL.createObjectURL(blob);
                    embed.type = 'application/pdf';
                    embed.width = '100%';
                    embed.height = '600px';
                    previewContainer.appendChild(embed);
                } else if (fileName.endsWith('.docx')) {
                    // Word文件预览
                    const iframe = document.createElement('iframe');
                    iframe.src = URL.createObjectURL(blob);
                    iframe.width = '100%';
                    iframe.height = '600px';
                    previewContainer.appendChild(iframe);
                } else if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
                    console.log(111111111, LuckyExcel);

                    const files = new window.File([blob], 'fileInfo.xlsx', { type: "application/vnd.ms-excel;charset=utf-8" });
                    // luckexcel
                    LuckyExcel.transformExcelToLucky(files, exportJson => {
                        // eslint-disable-next-line
                        // luckysheet.destroy()
                        // eslint-disable-next-line
                        console.log('xxx', exportJson.sheets, luckysheet);
                        var ll = luckysheet;
                        luckysheet.create({
                            container: 'luckysheet', // luckysheet为容器id
                            lang: 'zh', //默认语言
                            title: "this.fileInfo.fileName",
                            data: exportJson.sheets //导入excel数据, title: "bi", // 工作簿名称
                                ,
                            lang: "zh", // 设定表格语言 国际化设置，允许设置表格的语言，支持中文("zh")和英文("en")
                            allowCopy: false, // 是否允许拷贝
                            showtoolbar: false, // 是否显示工具栏
                            showinfobar: false, // 是否显示顶部信息栏
                            showsheetbar: true, // 是否显示底部sheet页按钮
                            showstatisticBar: false, // 是否显示底部计数栏
                            sheetBottomConfig: false, // sheet页下方的添加行按钮和回到顶部按钮配置
                            allowEdit: false, // 是否允许前台编辑
                            enableAddRow: false, // 允许增加行
                            enableAddCol: false, // 允许增加列
                            userInfo: false, // 右上角的用户信息展示样式
                            showRowBar: true, // 是否显示行号区域
                            showColumnBar: true, // 是否显示列号区域
                            sheetFormulaBar: true, // 是否显示公式栏
                            enableAddBackTop: true, //返回头部按钮
                            rowHeaderWidth: 0, //纵坐标
                            columnHeaderHeight: 0 //横坐标
                        })
                    })
                    // this.dialogVisible=true;

                } else if (fileName.endsWith('/')) {} else {
                    // 其他文件类型暂不支持预览
                    const message = document.createElement('p');
                    message.textContent = 'Preview not available for this file.';
                    previewContainer.appendChild(message);
                }
            }).catch(function(err) {
                console.error("Failed to preview file:", err);
            });
        }
    },
    data() {
        return {
            dialogVisible: false,
            url: 'https://static.ximu.cn/test_upload_ZH12304010001_1683352877.xlsx',
            // excel: 'http://static.shanhuxueyuan.com/demo/excel.xlsx'//设置文档地址
        }
    },
    methods: {
        renderedHandler() {
            console.log("渲染完成")
        },
        errorHandler() {
            console.log("渲染失败")
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    console.log(_);
                    done();
                })
                .catch(_ => {
                    console.log(_);
                });

        }
    }
}
</script>

<style lang="css" scoped>
.luckysheet-content {
    margin: 0px;
    padding: 0px;
    position: absolute;
    width: 600px;
    height: 500px;
    left: 0px;
    top: 40px;
    bottom: 0px;
}
</style>


