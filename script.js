// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 语言切换功能
    const langSwitchers = document.querySelectorAll('.lang-switch');
    
    langSwitchers.forEach(switcher => {
        switcher.addEventListener('click', function(e) {
            e.preventDefault();
            const targetLang = this.getAttribute('data-lang');
            
            // 根据目标语言切换页面
            if (targetLang === 'en') {
                window.location.href = 'index_en.html';
            } else if (targetLang === 'zh-CN') {
                window.location.href = 'index.html';
            }
        });
    });

    // 汉堡菜单切换
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('show');
        });
    }
    
    // 点击导航链接关闭菜单
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                mainNav.classList.remove('show');
            }
        });
    });
    
    // 轮播图功能实现
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // 初始化轮播图
    function initCarousel() {
        if (slides.length === 0) return;
        
        // 设置初始活动状态
        updateCarousel();
        
        // 自动轮播
        setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    // 更新轮播图状态
    function updateCarousel() {
        // 更新幻灯片状态
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // 更新指示器状态
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // 下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel();
    }
    
    // 上一张幻灯片
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    // 绑定轮播图控制事件
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
    }
    
    // 绑定指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // 调用初始化轮播图
    initCarousel();
    
    // 数字滚动动画效果
    function animateCounters() {
        const counters = document.querySelectorAll('.count');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/,/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current).toLocaleString();
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        });
    }
    
    // 判断元素是否在视口中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // 滚动到数据概览区域时触发数字动画
    function checkAnimationStart() {
        const dashboardCards = document.querySelector('.dashboard-cards');
        if (dashboardCards && isInViewport(dashboardCards)) {
            animateCounters();
            window.removeEventListener('scroll', checkAnimationStart);
        }
    }
    
    // 添加滚动事件监听
    window.addEventListener('scroll', checkAnimationStart);
    checkAnimationStart(); // 初始检查，如果一开始就在视口中
    
    // 模拟从后端获取数据
    function fetchDashboardData() {
        // 在实际项目中，这里应该使用fetch或axios从后端API获取数据
        // 这里使用setTimeout模拟异步请求
        setTimeout(() => {
            // 模拟从服务器获取的数据
            const data = {
                strainCount: 15832,
                sampleCount: 32450,
                newCount: 120,
                analysisCount: 45,
                lastUpdate: '2025-03-12 14:32'
            };
            
            // 更新DOM
            document.getElementById('strain-count').textContent = data.strainCount.toLocaleString();
            document.getElementById('sample-count').textContent = data.sampleCount.toLocaleString();
            document.getElementById('new-count').textContent = data.newCount.toLocaleString();
            document.getElementById('analysis-count').textContent = data.analysisCount.toLocaleString();
            
            // 更新所有的最后更新时间
            const updateTimes = document.querySelectorAll('.update-time');
            updateTimes.forEach(elem => {
                elem.textContent = `最近更新：${data.lastUpdate}`;
            });
            
            // 重新触发计数器动画
            animateCounters();
        }, 1000);
    }
    
    // 调用获取数据函数
    fetchDashboardData();
    
    // 监听窗口大小变化，适配响应式设计
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mainNav.classList.contains('show')) {
                mainNav.classList.remove('show');
                hamburger.classList.remove('active');
            }
        }
    });
    
    // 实现平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 处理引用功能
    // 引用格式切换
    const formatButtons = document.querySelectorAll('.format-btn');
    const citationText = document.querySelector('.citation-box p');
    
    // 不同引用格式
    const citations = {
        apa: 'Luo C, Wang S, Shan W, et al. A Whole Exon Screening-Based Score Model Predicts Prognosis and Immune Checkpoint Inhibitor Therapy Effects in Low-Grade Glioma. Front Immunol. 2022;13:909189. Published 2022 Jun 13. doi:10.3389/fimmu.2022.909189',
        mla: 'Luo, Cheng, et al. "A Whole Exon Screening-Based Score Model Predicts Prognosis and Immune Checkpoint Inhibitor Therapy Effects in Low-Grade Glioma." Frontiers in Immunology, vol. 13, 2022, 909189. doi:10.3389/fimmu.2022.909189',
        bibtex: '@article{luo2022whole,\n  title={A Whole Exon Screening-Based Score Model Predicts Prognosis and Immune Checkpoint Inhibitor Therapy Effects in Low-Grade Glioma},\n  author={Luo, Cheng and Wang, Shanbo and Shan, Wei and others},\n  journal={Frontiers in Immunology},\n  volume={13},\n  pages={909189},\n  year={2022},\n  publisher={Frontiers Media SA},\n  doi={10.3389/fimmu.2022.909189}\n}',
        ris: 'TY  - JOUR\nTI  - A Whole Exon Screening-Based Score Model Predicts Prognosis and Immune Checkpoint Inhibitor Therapy Effects in Low-Grade Glioma\nAU  - Luo, C\nAU  - Wang, S\nAU  - Shan, W\nPY  - 2022\nDA  - 2022/06/13\nJO  - Frontiers in Immunology\nVL  - 13\nSP  - 909189\nDO  - 10.3389/fimmu.2022.909189\nER  - '
    };
    
    // 点击切换引用格式
    formatButtons.forEach(button => {
        button.addEventListener('click', function() {
            const format = this.getAttribute('data-format');
            
            // 更新引用文本
            citationText.textContent = citations[format];
            
            // 更新活动按钮状态
            formatButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 对于特殊格式（如BibTeX和RIS），保留文本格式
            if (format === 'bibtex' || format === 'ris') {
                citationText.style.whiteSpace = 'pre-wrap';
            } else {
                citationText.style.whiteSpace = 'normal';
            }
        });
    });
    
    // 复制引用功能
    const copyButton = document.getElementById('citation-copy-btn');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const text = citationText.textContent;
            navigator.clipboard.writeText(text).then(function() {
                // 显示复制成功反馈
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="fas fa-check"></i> 已复制';
                
                // 3秒后恢复原始文本
                setTimeout(function() {
                    copyButton.innerHTML = originalText;
                }, 3000);
            }).catch(function(err) {
                console.error('复制失败: ', err);
            });
        });
    }
}); 