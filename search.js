// 搜索页面的JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const searchInput = document.getElementById('strain-search');
    const searchBtn = document.getElementById('search-btn');
    const strainType = document.getElementById('strain-type');
    const collectionYear = document.getElementById('collection-year');
    const geoSource = document.getElementById('geo-source');
    const advancedToggle = document.getElementById('advanced-search-toggle');
    const advancedOptions = document.querySelector('.advanced-options');
    const geneFeature = document.getElementById('gene-feature');
    const phenotype = document.getElementById('phenotype');
    const resistance = document.getElementById('resistance');
    const resultList = document.getElementById('result-list');
    const resultNum = document.getElementById('result-num');
    
    // 切换高级搜索选项
    advancedToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 切换显示/隐藏高级选项
        if (advancedOptions.style.display === 'none' || !advancedOptions.style.display) {
            advancedOptions.style.display = 'grid';
            advancedToggle.innerHTML = '收起高级搜索 <i class="fas fa-angle-up"></i>';
        } else {
            advancedOptions.style.display = 'none';
            advancedToggle.innerHTML = '高级搜索 <i class="fas fa-angle-down"></i>';
        }
    });
    
    // 搜索按钮点击事件
    searchBtn.addEventListener('click', function() {
        performSearch();
    });
    
    // 按Enter键也能搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 执行搜索功能
    function performSearch() {
        // 获取搜索参数
        const searchParams = {
            keyword: searchInput.value.trim(),
            strainType: strainType.value,
            collectionYear: collectionYear.value,
            geoSource: geoSource.value,
            geneFeature: geneFeature ? geneFeature.value.trim() : '',
            phenotype: phenotype ? phenotype.value.trim() : '',
            resistance: resistance ? resistance.value.trim() : ''
        };
        
        // 验证是否有搜索关键词
        if (!searchParams.keyword && searchParams.strainType === 'all' && 
            searchParams.collectionYear === 'all' && searchParams.geoSource === 'all' &&
            !searchParams.geneFeature && !searchParams.phenotype && !searchParams.resistance) {
            alert('请输入至少一个搜索条件');
            return;
        }
        
        // 显示加载状态
        resultList.innerHTML = '<div class="loading">正在搜索，请稍候...</div>';
        
        // 这里应该向后端发送搜索请求
        // 在实际项目中，使用fetch或axios发送AJAX请求到后端API
        // 这里使用模拟数据演示
        
        setTimeout(() => {
            // 模拟搜索结果
            const mockResults = getMockResults(searchParams);
            displayResults(mockResults);
        }, 1000);
    }
    
    // 模拟获取搜索结果
    function getMockResults(params) {
        // 创建一些模拟数据
        const mockData = [
            {
                id: 'BS001',
                name: '大肠杆菌 O157:H7',
                type: 'bacteria',
                year: '2023',
                source: 'asia',
                location: '中国，北京',
                description: '一种致病性大肠杆菌，可导致食物中毒和严重的肠胃疾病。',
                tags: ['肠道菌', '致病菌', '食源性疾病'],
                geneFeatures: ['stx1', 'stx2'],
                phenotypes: ['溶血性', '肠黏附性'],
                resistance: ['四环素', '氨苄青霉素']
            },
            {
                id: 'BS002',
                name: '金黄色葡萄球菌 MRSA',
                type: 'bacteria',
                year: '2022',
                source: 'europe',
                location: '德国，柏林',
                description: '一种耐甲氧西林金黄色葡萄球菌，是常见的医院获得性感染源。',
                tags: ['耐药菌', '医院感染', '皮肤感染'],
                geneFeatures: ['mecA', 'PVL'],
                phenotypes: ['生物膜', '侵袭性'],
                resistance: ['甲氧西林', '万古霉素', '庆大霉素']
            },
            {
                id: 'BS003',
                name: '结核分枝杆菌 H37Rv',
                type: 'bacteria',
                year: '2023',
                source: 'asia',
                location: '印度，新德里',
                description: '结核病的主要致病菌，可引起肺结核和其他器官的结核病。',
                tags: ['分枝杆菌', '慢性感染', '结核病'],
                geneFeatures: ['katG', 'rpoB'],
                phenotypes: ['细胞内寄生', '持续性'],
                resistance: ['异烟肼', '利福平']
            },
            {
                id: 'BS004',
                name: '白色念珠菌',
                type: 'fungi',
                year: '2024',
                source: 'namerica',
                location: '美国，纽约',
                description: '一种常见的酵母菌，是人体正常菌群成员，但在某些条件下可致病。',
                tags: ['真菌', '酵母菌', '皮肤感染'],
                geneFeatures: ['ERG11', 'CDR1'],
                phenotypes: ['生物膜', '二型性'],
                resistance: ['氟康唑', '伊曲康唑']
            },
            {
                id: 'BS005',
                name: '流感病毒 H1N1',
                type: 'virus',
                year: '2022',
                source: 'asia',
                location: '日本，东京',
                description: '甲型流感病毒的一种亚型，可引起季节性流感和大流行。',
                tags: ['RNA病毒', '呼吸道感染', '流行性'],
                geneFeatures: ['HA', 'NA'],
                phenotypes: ['高变异性', '传播力强'],
                resistance: ['奥司他韦', '金刚烷胺']
            }
        ];
        
        // 根据搜索参数过滤结果
        let filteredResults = mockData;
        
        // 关键词搜索
        if (params.keyword) {
            const keyword = params.keyword.toLowerCase();
            filteredResults = filteredResults.filter(item => 
                item.id.toLowerCase().includes(keyword) || 
                item.name.toLowerCase().includes(keyword) ||
                item.description.toLowerCase().includes(keyword) ||
                item.tags.some(tag => tag.toLowerCase().includes(keyword))
            );
        }
        
        // 菌种类型过滤
        if (params.strainType !== 'all') {
            filteredResults = filteredResults.filter(item => item.type === params.strainType);
        }
        
        // 收集年份过滤
        if (params.collectionYear !== 'all') {
            if (params.collectionYear === 'older') {
                filteredResults = filteredResults.filter(item => parseInt(item.year) < 2022);
            } else {
                filteredResults = filteredResults.filter(item => item.year === params.collectionYear);
            }
        }
        
        // 地理来源过滤
        if (params.geoSource !== 'all') {
            filteredResults = filteredResults.filter(item => item.source === params.geoSource);
        }
        
        // 基因特征过滤
        if (params.geneFeature) {
            const geneFeature = params.geneFeature.toLowerCase();
            filteredResults = filteredResults.filter(item => 
                item.geneFeatures.some(gene => gene.toLowerCase().includes(geneFeature))
            );
        }
        
        // 表型特征过滤
        if (params.phenotype) {
            const phenotype = params.phenotype.toLowerCase();
            filteredResults = filteredResults.filter(item => 
                item.phenotypes.some(p => p.toLowerCase().includes(phenotype))
            );
        }
        
        // 抗性特征过滤
        if (params.resistance) {
            const resistance = params.resistance.toLowerCase();
            filteredResults = filteredResults.filter(item => 
                item.resistance.some(r => r.toLowerCase().includes(resistance))
            );
        }
        
        return filteredResults;
    }
    
    // 显示搜索结果
    function displayResults(results) {
        resultNum.textContent = results.length;
        
        if (results.length === 0) {
            resultList.innerHTML = '<div class="no-results">没有找到符合条件的结果</div>';
            return;
        }
        
        // 构建结果HTML
        let resultsHTML = '';
        results.forEach(result => {
            let tagsHTML = '';
            result.tags.forEach(tag => {
                tagsHTML += `<span class="tag">${tag}</span>`;
            });
            
            resultsHTML += `
                <div class="result-item">
                    <h4>${result.name} <span class="result-id">(${result.id})</span></h4>
                    <div class="result-meta">
                        <div class="meta-item">
                            <i class="fas fa-flask"></i> ${getTypeText(result.type)}
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-calendar"></i> ${result.year}年
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i> ${result.location}
                        </div>
                    </div>
                    <div class="result-description">
                        ${result.description}
                    </div>
                    <div class="result-tags">
                        ${tagsHTML}
                    </div>
                </div>
            `;
        });
        
        resultList.innerHTML = resultsHTML;
    }
    
    // 获取菌种类型的中文表述
    function getTypeText(type) {
        switch(type) {
            case 'bacteria': return '细菌';
            case 'fungi': return '真菌';
            case 'virus': return '病毒';
            default: return type;
        }
    }
}); 