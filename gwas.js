// 微生物组GWAS分析页面JS
document.addEventListener('DOMContentLoaded', function() {
    // 全局变量
    let microbiomeData = null;
    let gwasResults = null;
    let significantFeatures = [];
    
    // 获取DOM元素
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const methodTabs = document.querySelectorAll('.method-tab');
    const methodPanels = document.querySelectorAll('.method-panel');
    const gwasTypeSelect = document.getElementById('gwas-type');
    const gwasTypeDesc = document.getElementById('gwas-type-desc');
    const phenotypeSelect = document.getElementById('phenotype');
    const diseaseSubtypeGroup = document.getElementById('disease-subtype-group');
    const datasetSelect = document.getElementById('dataset');
    const customDatasetGroup = document.getElementById('custom-dataset-group');
    const nextToParamBtn = document.getElementById('next-to-param');
    const backToDataBtn = document.getElementById('back-to-data');
    const runAnalysisBtn = document.getElementById('run-analysis');
    const analysisLoader = document.getElementById('analysis-loader');
    const analysisResults = document.getElementById('analysis-results');
    const downloadResultsBtn = document.getElementById('download-results');
    const newAnalysisBtn = document.getElementById('new-analysis');
    
    // 初始化功能
    initTabSystem();
    initFormControls();
    initMethodTabs();
    
    // 初始化选项卡系统
    function initTabSystem() {
        // 主要选项卡切换
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const target = this.dataset.tab;
                
                // 更新按钮状态
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // 更新面板状态
                tabPanels.forEach(panel => {
                    if (panel.id === target) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            });
        });
        
        // 按钮导航
        if (nextToParamBtn) {
            nextToParamBtn.addEventListener('click', function() {
                switchToTab('param-tab');
            });
        }
        
        if (backToDataBtn) {
            backToDataBtn.addEventListener('click', function() {
                switchToTab('data-tab');
            });
        }
        
        if (runAnalysisBtn) {
            runAnalysisBtn.addEventListener('click', function() {
                switchToTab('result-tab');
                startAnalysis();
            });
        }
        
        if (newAnalysisBtn) {
            newAnalysisBtn.addEventListener('click', function() {
                resetAnalysis();
                switchToTab('data-tab');
            });
        }
    }
    
    // 初始化表单控件
    function initFormControls() {
        // GWAS类型说明更新
        if (gwasTypeSelect) {
            gwasTypeSelect.addEventListener('change', function() {
                updateGwasTypeDescription();
            });
            
            // 初始化说明
            updateGwasTypeDescription();
        }
        
        // 表型选择逻辑
        if (phenotypeSelect) {
            phenotypeSelect.addEventListener('change', function() {
                updatePhenotypeControls();
            });
            
            // 初始化表型控件
            updatePhenotypeControls();
        }
        
        // 数据集选择逻辑
        if (datasetSelect) {
            datasetSelect.addEventListener('change', function() {
                if (this.value === 'custom') {
                    customDatasetGroup.style.display = 'block';
                } else {
                    customDatasetGroup.style.display = 'none';
                }
            });
        }
        
        // 下载结果按钮
        if (downloadResultsBtn) {
            downloadResultsBtn.addEventListener('click', function() {
                downloadResults();
            });
        }
    }
    
    // 初始化方法选项卡
    function initMethodTabs() {
        methodTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const methodId = this.dataset.method;
                
                // 更新选项卡状态
                methodTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // 更新面板状态
                methodPanels.forEach(panel => {
                    if (panel.id === methodId) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // 切换到指定选项卡
    function switchToTab(tabId) {
        tabBtns.forEach(btn => {
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        tabPanels.forEach(panel => {
            if (panel.id === tabId) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }
    
    // 更新GWAS类型描述
    function updateGwasTypeDescription() {
        const selectedType = gwasTypeSelect.value;
        
        switch (selectedType) {
            case 'strain':
                gwasTypeDesc.textContent = '菌株级GWAS：研究特定菌株的存在/丰度与宿主表型之间的关联';
                break;
            case 'gene':
                gwasTypeDesc.textContent = '基因级GWAS：研究特定微生物基因与宿主表型之间的关联';
                break;
            case 'snp':
                gwasTypeDesc.textContent = 'SNP级GWAS：研究微生物基因组中的遗传变异（SNPs）与宿主表型之间的关联';
                break;
        }
    }
    
    // 更新表型相关控件
    function updatePhenotypeControls() {
        const selectedPhenotype = phenotypeSelect.value;
        
        // 控制疾病亚型选项的显示
        if (selectedPhenotype === 'disease') {
            diseaseSubtypeGroup.style.display = 'block';
        } else {
            diseaseSubtypeGroup.style.display = 'none';
        }
    }
    
    // 启动分析过程
    function startAnalysis() {
        // 显示加载动画，隐藏结果
        analysisLoader.style.display = 'block';
        analysisResults.style.display = 'none';
        
        // 模拟分析过程（实际应用中这里会是一个真实的API请求）
        setTimeout(function() {
            // 生成模拟数据
            generateMicrobiomeData();
            
            // 运行GWAS分析
            runGwasAnalysis();
            
            // 显示结果
            displayResults();
            
            // 隐藏加载动画，显示结果
            analysisLoader.style.display = 'none';
            analysisResults.style.display = 'block';
        }, 2500); // 模拟2.5秒的分析时间
    }
    
    // 重置分析
    function resetAnalysis() {
        microbiomeData = null;
        gwasResults = null;
        significantFeatures = [];
    }
    
    // 生成微生物组模拟数据
    function generateMicrobiomeData() {
        const gwasType = gwasTypeSelect.value;
        const dataset = datasetSelect.value;
        
        let featureCount = 0;
        let sampleCount = 0;
        let featurePrefix = '';
        
        // 根据选择的数据集确定样本数
        switch (dataset) {
            case 'skin_microbiome':
                sampleCount = 120;
                break;
            case 'gut_microbiome':
                sampleCount = 350;
                break;
            case 'oral_microbiome':
                sampleCount = 180;
                break;
            default:
                sampleCount = 120;
        }
        
        // 根据GWAS类型确定特征数和前缀
        switch (gwasType) {
            case 'strain':
                featureCount = 350;
                featurePrefix = 'SGB';
                break;
            case 'gene':
                featureCount = 1500;
                featurePrefix = 'KEGG';
                break;
            case 'snp':
                featureCount = 5000;
                featurePrefix = 'SNP';
                break;
        }
        
        // 创建模拟特征列表
        const features = [];
        
        for (let i = 1; i <= featureCount; i++) {
            const id = `${featurePrefix}${i.toString().padStart(5, '0')}`;
            let name = '';
            let category = '';
            
            // 生成名称和分类
            if (gwasType === 'strain') {
                // 随机选择一些细菌属
                const genera = ['Staphylococcus', 'Streptococcus', 'Cutibacterium', 'Corynebacterium', 
                               'Escherichia', 'Bacteroides', 'Bifidobacterium', 'Lactobacillus', 
                               'Akkermansia', 'Faecalibacterium', 'Prevotella', 'Roseburia'];
                               
                // 随机选择一些种
                const species = ['aureus', 'epidermidis', 'hominis', 'acnes', 'coli', 
                                'fragilis', 'longum', 'rhamnosus', 'muciniphila', 
                                'prausnitzii', 'copri', 'intestinalis'];
                                
                const genus = genera[Math.floor(Math.random() * genera.length)];
                const speciesName = Math.random() < 0.7 ? 
                              species[Math.floor(Math.random() * species.length)] : 
                              'sp.';
                              
                name = `${genus} ${speciesName}`;
                
                // 生成常见的细菌类别
                const categories = ['Firmicutes', 'Bacteroidetes', 'Proteobacteria', 'Actinobacteria', 'Verrucomicrobia'];
                category = categories[Math.floor(Math.random() * categories.length)];
            } 
            else if (gwasType === 'gene') {
                // 生成常见的功能基因名称
                const functionPrefixes = ['adh', 'lac', 'fab', 'dna', 'rna', 'clp', 'rec', 'fts', 'gyr', 'rpo'];
                const functionSuffixes = ['A', 'B', 'C', 'D', 'E', 'G', 'K', 'L', 'M', 'P', 'R', 'S', 'T', 'Z'];
                
                const prefix = functionPrefixes[Math.floor(Math.random() * functionPrefixes.length)];
                const suffix = functionSuffixes[Math.floor(Math.random() * functionSuffixes.length)];
                
                name = `${prefix}${suffix}`;
                
                // 生成功能类别
                const categories = ['Metabolism', 'Genetic Information Processing', 'Environmental Information Processing', 
                                   'Cellular Processes', 'Organismal Systems', 'Human Diseases', 'Drug Development'];
                category = categories[Math.floor(Math.random() * categories.length)];
            }
            else if (gwasType === 'snp') {
                // SNP ID通常是位置和染色体
                const chromosomes = ['I', 'II', 'III', 'IV', 'V', 'plasmid'];
                const chromosome = chromosomes[Math.floor(Math.random() * chromosomes.length)];
                const position = Math.floor(Math.random() * 5000000) + 1;
                
                name = `${chromosome}:${position}`;
                
                // SNP类型
                const categories = ['Nonsynonymous', 'Synonymous', 'Intergenic', 'Promoter', 'Terminator'];
                category = categories[Math.floor(Math.random() * categories.length)];
            }
            
            features.push({
                id: id,
                name: name,
                category: category
            });
        }
        
        // 储存生成的数据
        microbiomeData = {
            features: features,
            sampleCount: sampleCount,
            featureCount: featureCount,
            type: gwasType
        };
    }
    
    // 运行GWAS分析
    function runGwasAnalysis() {
        if (!microbiomeData) return;
        
        const gwasType = gwasTypeSelect.value;
        const phenotype = phenotypeSelect.value;
        const pValueThreshold = parseFloat(document.getElementById('p-value-threshold').value);
        const correctionMethod = document.getElementById('correction-method').value;
        
        // 生成GWAS结果
        const results = [];
        const features = microbiomeData.features;
        
        // 为每个特征生成p值和效应值
        features.forEach(feature => {
            // 大多数特征的p值不显著
            let pValue = Math.random();
            
            // 添加一些显著的特征 (约5-10%)
            if (Math.random() < 0.08) {
                pValue = Math.random() * 0.01;
            }
            
            // 为特定类型或类别的特征增加显著性概率
            if (gwasType === 'strain' && feature.name.includes('aureus') && phenotype === 'disease') {
                pValue = Math.random() * 0.001;
            }
            
            if (gwasType === 'gene' && feature.category === 'Metabolism' && phenotype === 'bmi') {
                pValue = Math.random() * 0.001;
            }
            
            if (gwasType === 'snp' && feature.category === 'Nonsynonymous' && phenotype === 'inflammation') {
                pValue = Math.random() * 0.001;
            }
            
            // 生成效应值
            const effectSize = (Math.random() * 2 - 1) * 0.8; // -0.8 到 0.8 之间
            
            // 生成FDR校正的p值
            let adjustedPValue = pValue;
            if (correctionMethod === 'fdr') {
                // 简单模拟FDR校正，实际上更复杂
                adjustedPValue = Math.min(pValue * (Math.random() * 2 + 1), 1);
            } else if (correctionMethod === 'bonferroni') {
                // 简单模拟Bonferroni校正
                adjustedPValue = Math.min(pValue * features.length, 1);
            }
            
            results.push({
                feature: feature,
                pValue: pValue,
                adjustedPValue: adjustedPValue,
                effectSize: effectSize
            });
        });
        
        // 排序结果（按p值升序）
        results.sort((a, b) => a.pValue - b.pValue);
        
        // 找出显著的特征
        const significant = results.filter(result => result.pValue < pValueThreshold);
        
        // 存储GWAS结果
        gwasResults = results;
        significantFeatures = significant;
    }
    
    // 显示分析结果
    function displayResults() {
        if (!gwasResults || !microbiomeData) {
            return;
        }
        
        // 更新结果摘要
        updateResultSummary();
        
        // 绘制曼哈顿图
        drawManhattanPlot();
        
        // 绘制QQ图
        drawQQPlot();
        
        // 绘制热图
        drawHeatmap();
        
        // 填充显著特征表格
        populateFeatureTable();
    }
    
    // 更新结果摘要
    function updateResultSummary() {
        const phenotype = phenotypeSelect.value;
        let phenotypeName = '';
        
        if (phenotype === 'disease') {
            const diseaseSubtype = document.getElementById('disease-subtype').value;
            const diseaseNames = {
                'ad': '特应性皮炎(AD)',
                'diabetes': '糖尿病(Diabetes)',
                'ibd': '炎症性肠病(IBD)',
                'obesity': '肥胖(Obesity)',
                'asthma': '哮喘(Asthma)'
            };
            phenotypeName = diseaseNames[diseaseSubtype] || diseaseSubtype;
        } else {
            const phenotypeNames = {
                'age': '年龄',
                'gender': '性别',
                'bmi': 'BMI',
                'diet': '饮食习惯',
                'medication': '药物使用',
                'inflammation': '炎症指标'
            };
            phenotypeName = phenotypeNames[phenotype] || phenotype;
        }
        
        // 更新摘要值
        document.getElementById('summary-type').textContent = getGwasTypeName(microbiomeData.type);
        document.getElementById('summary-phenotype').textContent = phenotypeName;
        document.getElementById('summary-samples').textContent = microbiomeData.sampleCount;
        document.getElementById('summary-features').textContent = microbiomeData.featureCount;
        document.getElementById('summary-significant').textContent = significantFeatures.length;
    }
    
    // 获取GWAS类型名称
    function getGwasTypeName(type) {
        const typeNames = {
            'strain': '菌株级GWAS',
            'gene': '基因级GWAS',
            'snp': 'SNP级GWAS'
        };
        return typeNames[type] || type;
    }
    
    // 绘制曼哈顿图
    function drawManhattanPlot() {
        if (!gwasResults || gwasResults.length === 0) return;
        
        const container = document.getElementById('manhattan-plot');
        const pValueThreshold = parseFloat(document.getElementById('p-value-threshold').value);
        
        // 准备数据
        const data = [];
        const gwasType = microbiomeData.type;
        let xAxisTitle = '';
        
        // 根据类型设置X轴标题
        switch (gwasType) {
            case 'strain':
                xAxisTitle = '菌株特征';
                break;
            case 'gene':
                xAxisTitle = '基因特征';
                break;
            case 'snp':
                xAxisTitle = 'SNP位点';
                break;
        }
        
        // 按类别对结果分组
        const resultsByCategory = {};
        gwasResults.forEach(result => {
            const category = result.feature.category;
            if (!resultsByCategory[category]) {
                resultsByCategory[category] = [];
            }
            resultsByCategory[category].push(result);
        });
        
        // 为每个类别创建一个跟踪
        const categories = Object.keys(resultsByCategory).sort();
        const colors = [
            '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
            '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
        ];
        
        // 创建显著点的跟踪
        const sigPoints = {
            x: [],
            y: [],
            text: [],
            mode: 'markers',
            type: 'scatter',
            marker: {
                size: 8,
                color: 'red'
            },
            name: '显著'
        };
        
        // 为每个类别添加跟踪
        categories.forEach((category, index) => {
            const results = resultsByCategory[category];
            
            const trace = {
                x: [],
                y: [],
                text: [],
                mode: 'markers',
                type: 'scatter',
                marker: {
                    size: 5,
                    color: colors[index % colors.length]
                },
                name: category
            };
            
            results.forEach(result => {
                const logP = -Math.log10(result.pValue);
                
                if (result.pValue < pValueThreshold) {
                    // 显著点添加到红色跟踪
                    sigPoints.x.push(result.feature.id);
                    sigPoints.y.push(logP);
                    sigPoints.text.push(`${result.feature.name}<br>p=${result.pValue.toExponential(2)}<br>β=${result.effectSize.toFixed(3)}`);
                } else {
                    // 非显著点添加到类别跟踪
                    trace.x.push(result.feature.id);
                    trace.y.push(logP);
                    trace.text.push(`${result.feature.name}<br>p=${result.pValue.toExponential(2)}<br>β=${result.effectSize.toFixed(3)}`);
                }
            });
            
            data.push(trace);
        });
        
        // 添加显著点跟踪
        if (sigPoints.x.length > 0) {
            data.push(sigPoints);
        }
        
        // 布局设置
        const layout = {
            title: '微生物组特征关联曼哈顿图',
            xaxis: {
                title: xAxisTitle,
                tickangle: -45,
                automargin: true
            },
            yaxis: {
                title: '-log<sub>10</sub>(P)',
                automargin: true
            },
            showlegend: true,
            legend: {
                x: 1,
                xanchor: 'right',
                y: 1
            },
            shapes: [{
                type: 'line',
                x0: 0,
                x1: 1,
                xref: 'paper',
                y0: -Math.log10(pValueThreshold),
                y1: -Math.log10(pValueThreshold),
                line: {
                    color: 'red',
                    width: 2,
                    dash: 'dash'
                }
            }],
            hovermode: 'closest',
            height: 400,
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 50,
                pad: 4
            }
        };
        
        // 配置选项
        const config = {
            responsive: true,
            displayModeBar: true,
            modeBarButtonsToRemove: ['lasso2d', 'select2d']
        };
        
        // 绘制图表
        Plotly.newPlot(container, data, layout, config);
    }
    
    // 绘制QQ图
    function drawQQPlot() {
        if (!gwasResults || gwasResults.length === 0) return;
        
        const container = document.getElementById('qq-plot');
        
        // 准备数据
        const observedPValues = gwasResults.map(r => r.pValue).sort((a, b) => a - b);
        const expectedPValues = [];
        
        // 计算期望值
        for (let i = 0; i < observedPValues.length; i++) {
            expectedPValues.push((i + 0.5) / observedPValues.length);
        }
        
        // 转换为-log10
        const observedLog = observedPValues.map(p => -Math.log10(p));
        const expectedLog = expectedPValues.map(p => -Math.log10(p));
        
        // 找出最大值，用于对角线
        const maxLog = Math.max(...observedLog, ...expectedLog);
        
        // 定义数据
        const data = [
            // 观察值
            {
                x: expectedLog,
                y: observedLog,
                mode: 'markers',
                type: 'scatter',
                marker: {
                    size: 6,
                    color: '#1f77b4'
                },
                name: '观察值'
            },
            // 对角线
            {
                x: [0, maxLog],
                y: [0, maxLog],
                mode: 'lines',
                type: 'scatter',
                line: {
                    color: 'red',
                    width: 2,
                    dash: 'dash'
                },
                name: '期望线'
            }
        ];
        
        // 布局
        const layout = {
            title: 'QQ图',
            xaxis: {
                title: '期望 -log<sub>10</sub>(P)',
                automargin: true
            },
            yaxis: {
                title: '观察到的 -log<sub>10</sub>(P)',
                automargin: true
            },
            showlegend: true,
            legend: {
                x: 0,
                y: 1
            },
            height: 400,
            margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50,
                pad: 4
            }
        };
        
        // 配置
        const config = {
            responsive: true,
            displayModeBar: true
        };
        
        // 绘制图表
        Plotly.newPlot(container, data, layout, config);
    }
    
    // 绘制热图
    function drawHeatmap() {
        if (!significantFeatures || significantFeatures.length === 0) return;
        
        const container = document.getElementById('heatmap-plot');
        
        // 只使用前15个显著特征，避免热图过大
        const topFeatures = significantFeatures.slice(0, Math.min(15, significantFeatures.length));
        
        // 准备数据
        const featureNames = topFeatures.map(f => f.feature.name || f.feature.id);
        const phenotypes = ['疾病状态', '炎症程度', '年龄', '性别', 'BMI'];
        
        // 生成热图值
        const zValues = [];
        for (let i = 0; i < featureNames.length; i++) {
            const row = [];
            for (let j = 0; j < phenotypes.length; j++) {
                // 生成随机关联值
                let value = (Math.random() * 2 - 1) * 0.6; // -0.6 到 0.6 之间
                
                // 首列（当前选择的表型）使用真实效应值
                if (j === 0) {
                    value = topFeatures[i].effectSize;
                }
                
                row.push(value);
            }
            zValues.push(row);
        }
        
        // 定义数据
        const data = [{
            z: zValues,
            x: phenotypes,
            y: featureNames,
            type: 'heatmap',
            colorscale: 'RdBu',
            reversescale: true,
            zmin: -0.8,
            zmax: 0.8,
            colorbar: {
                title: '效应值 (β)',
                titleside: 'right'
            }
        }];
        
        // 布局
        const layout = {
            title: '微生物特征-表型关联热图',
            xaxis: {
                title: '表型',
                automargin: true
            },
            yaxis: {
                title: '微生物特征',
                automargin: true
            },
            height: 400,
            margin: {
                l: 150,
                r: 50,
                b: 50,
                t: 50,
                pad: 4
            }
        };
        
        // 配置
        const config = {
            responsive: true,
            displayModeBar: true
        };
        
        // 绘制图表
        Plotly.newPlot(container, data, layout, config);
    }
    
    // 填充显著特征表格
    function populateFeatureTable() {
        const tableBody = document.querySelector('#significant-features tbody');
        tableBody.innerHTML = '';
        
        if (significantFeatures.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 7;
            cell.textContent = '没有发现显著关联的特征';
            cell.style.textAlign = 'center';
            row.appendChild(cell);
            tableBody.appendChild(row);
            return;
        }
        
        // 只显示前20个结果
        const displayFeatures = significantFeatures.slice(0, 20);
        
        displayFeatures.forEach(result => {
            const row = document.createElement('tr');
            
            // 特征ID
            const idCell = document.createElement('td');
            idCell.textContent = result.feature.id;
            row.appendChild(idCell);
            
            // 特征名称
            const nameCell = document.createElement('td');
            nameCell.textContent = result.feature.name || '-';
            row.appendChild(nameCell);
            
            // 分类
            const categoryCell = document.createElement('td');
            categoryCell.textContent = result.feature.category || '-';
            row.appendChild(categoryCell);
            
            // p值
            const pValueCell = document.createElement('td');
            pValueCell.textContent = result.pValue.toExponential(2);
            row.appendChild(pValueCell);
            
            // 校正后p值
            const adjPValueCell = document.createElement('td');
            adjPValueCell.textContent = result.adjustedPValue.toExponential(2);
            row.appendChild(adjPValueCell);
            
            // 效应值
            const effectCell = document.createElement('td');
            effectCell.textContent = result.effectSize.toFixed(4);
            if (result.effectSize > 0) {
                effectCell.style.color = 'green';
            } else if (result.effectSize < 0) {
                effectCell.style.color = 'red';
            }
            row.appendChild(effectCell);
            
            // 详情链接
            const detailCell = document.createElement('td');
            const detailLink = document.createElement('a');
            detailLink.href = '#';
            detailLink.className = 'detail-link';
            detailLink.textContent = '查看详情';
            detailLink.addEventListener('click', function(e) {
                e.preventDefault();
                showFeatureDetails(result);
            });
            detailCell.appendChild(detailLink);
            row.appendChild(detailCell);
            
            tableBody.appendChild(row);
        });
        
        // 如果有更多结果，显示提示信息
        if (significantFeatures.length > 20) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 7;
            cell.textContent = `显示前20个结果，共找到 ${significantFeatures.length} 个显著关联的特征`;
            cell.style.textAlign = 'center';
            cell.style.fontStyle = 'italic';
            row.appendChild(cell);
            tableBody.appendChild(row);
        }
    }
    
    // 显示特征详细信息（模拟弹窗）
    function showFeatureDetails(result) {
        const feature = result.feature;
        const gwasType = microbiomeData.type;
        
        let detailMessage = `特征ID: ${feature.id}\n`;
        detailMessage += `特征名称: ${feature.name || '未命名'}\n`;
        detailMessage += `分类: ${feature.category || '未分类'}\n\n`;
        detailMessage += `统计结果:\n`;
        detailMessage += `P值: ${result.pValue.toExponential(6)}\n`;
        detailMessage += `校正后P值: ${result.adjustedPValue.toExponential(6)}\n`;
        detailMessage += `效应值(β): ${result.effectSize.toFixed(6)}\n\n`;
        
        // 根据GWAS类型添加特定信息
        if (gwasType === 'strain') {
            detailMessage += `微生物类型: 菌株\n`;
            detailMessage += `相对丰度: ${(Math.random() * 5).toFixed(2)}%\n`;
            detailMessage += `检出率: ${Math.round(Math.random() * 100)}%\n`;
        } 
        else if (gwasType === 'gene') {
            detailMessage += `微生物功能: 基因\n`;
            detailMessage += `通路: ${Math.random() < 0.5 ? 'KEGG Pathway' : 'MetaCyc Pathway'}\n`;
            detailMessage += `功能描述: ${feature.name ? `编码${feature.name}功能的基因` : '未知功能基因'}\n`;
        }
        else if (gwasType === 'snp') {
            detailMessage += `微生物变异: SNP\n`;
            detailMessage += `位置: ${feature.name}\n`;
            detailMessage += `变异类型: ${feature.category}\n`;
            detailMessage += `微生物来源: ${Math.random() < 0.5 ? 'Staphylococcus aureus' : 'Cutibacterium acnes'}\n`;
        }
        
        alert(detailMessage);
    }
    
    // 下载结果
    function downloadResults() {
        if (!significantFeatures || significantFeatures.length === 0) {
            alert('没有可下载的结果');
            return;
        }
        
        // 准备CSV内容
        let csvContent = '特征ID,特征名称,分类,p值,校正后p值,效应值(β)\n';
        
        significantFeatures.forEach(result => {
            const feature = result.feature;
            csvContent += `${feature.id},${feature.name || 'NA'},${feature.category || 'NA'},${result.pValue},${result.adjustedPValue},${result.effectSize}\n`;
        });
        
        // 创建下载链接
        const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        
        // 生成文件名
        const gwasType = microbiomeData.type;
        const phenotype = phenotypeSelect.value;
        const date = new Date().toISOString().slice(0, 10);
        link.setAttribute('download', `Microbiome_GWAS_${gwasType}_${phenotype}_${date}.csv`);
        
        // 触发下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}); 