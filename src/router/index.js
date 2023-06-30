import Vue from 'vue'
import VueRouter from 'vue-router'
import Subject01 from "../views/subject/Subject01"


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: "/main",
      meta: {
        visible: false,
      }
    },
    {
      path: '/main',
      name: '메인화면',
      component: () => import('../views/Main'),
      meta: {
        visible: false
      }
    },
    {
      path: "/404",
      name: "404",
      component: () => import("../views/error/Error404"),
      meta: {
        visible: false
      }
    },
    {
      path: "/staticPop/:tblMgmNo/:gubun",
      name: "staticPop",
      component: () => import("../views/subject/StaticPop"),
      props: true,
      meta: {
        visible: false
      }
    },
    {
      path: "*",
      redirect: "/404",
      meta: {
        visible: false
      }
    },
    {
      path: '/subject', // 주제별통계
      name: '주제별통계',
      component: () => import('../components/Contents'),
      meta: {
        visible: true
      },
      children: [
        {
          path: "subject01/:subItemId",
          name: "문화",
          component: Subject01,
          props: true,
          meta: {
            visible: true,
            title: '문화 | 주제별통계 | 문화셈터',
            menuInfo: '다양한 문화분야에 관한 신뢰성 있는 통계',
            subMenuItemType: 'STBL',
            subMenuItemMgmNo: 'STBL-1014250'
          }
        },
        {
          path: "subject02/:subItemId",
          name: "예술",
          component: Subject01,
          props: true,
          meta: {
            visible: true,
            title: '예술 | 주제별통계 | 문화셈터',
            menuInfo: '다양한 예술 분야에 관한 신뢰성 있는 통계',
            subMenuItemType: 'STBL',
            subMenuItemMgmNo: 'STBL-1030638'
          }
        },
        {
          path: "subject03/:subItemId",
          name: "문화산업",
          component: Subject01,
          props: true,
          meta: {
            visible: true,
            title: '문화산업 | 주제별통계 | 문화셈터',
            menuInfo: '다양한 문화산업 분야에 관한 신뢰성 있는 통계',
            subMenuItemType: 'STBL',
            subMenuItemMgmNo: 'STBL-1014252'
          }
        },
        {
          path: "subject04/:subItemId",
          name: "관광",
          component: Subject01,
          props: true,
          meta: {
            visible: true,
            title: '관광 | 주제별통계 | 문화셈터',
            menuInfo: '다양한 관광 분야에 관한 신뢰성 있는 통계',
            subMenuItemType: 'STBL',
            subMenuItemMgmNo: 'STBL-1014253'
          }
        },
        {
          path: "subject05/:subItemId",
          name: "스포츠",
          component: Subject01,
          props: true,
          meta: {
            visible: true,
            title: '스포츠 | 주제별통계 | 문화셈터',
            menuInfo: '다양한 스포츠 분야에 관한 신뢰성 있는 통계',
            subMenuItemType: 'STBL',
            subMenuItemMgmNo: 'STBL-1014255'
          }
        },
        {
          path: "subject06/:subItemId",
          name: "종합",
          component: Subject01,
          props: true,
          meta: {
            visible: true,
            title: '종합 | 주제별통계 | 문화셈터',
            menuInfo: '다양한 종합 분야에 관한 신뢰성 있는 통계',
            subMenuItemType: 'STBL',
            subMenuItemMgmNo: 'STBL-1030639'
          }
        },
      ]
    },
    {
      path: '/index', // 주요지표
      name: '주요지표',
      component: () => import('../components/Contents'),
      meta: {
        visible: true
      },
      children: [
        {
          path: "index01/:subItemId",
          name: "지표통계",
          component: () =>
            import("../views/index/Index01"),
          props: true,
          meta: {
            visible: true,
            title: '지표통계 | 주요지표 | 문화셈터',
            menuInfo: '경제분야 속에서 찾아낸 다양한 문화지표통계',
            subMenuItemType: 'STBL',
            subMenuItemMgmNo: 'STBL-1025445',
          },
        },
        {
          path: "index02/:subItemId",
          name: "e-나라지표",
          component: () =>
            import("../views/index/Index02"),
          props: true,
          meta: {
            visible: true,
            title: 'e-나라지표 | 주요지표 | 문화셈터',
            menuInfo: 'e-나라지표시스템에서 제공되는 통계자료 및 지표통계',
            subMenuItemType: 'CODE',
            subMenuItemMgmNo: '000000'
          }
        },
      ]
    },
    {
      path: '/visual', // 시각화
      name: '시각화',
      component: () => import('../components/Contents'),
      meta: {
        visible: true
      },
      children: [
        {
          path: "sns",
          name: "SNS분석",
          component: () =>
            import("../views/visual/Sns"),
          meta: {
            visible: true,
            title: 'SNS분석 | 시각화 | 문화셈터',
            menuInfo: '문화체육관광 관련 SNS 분석 서비스'
          }
        },
        {
          path: "map",
          name: "지도통계",
          meta: {
            visible: true,
            linkUrl: process.env.VUE_APP_MAP_SERVER
          }
        },
        {
          path: "infographic",
          name: "인포그래픽",
          component: () =>
            import("../views/visual/Infographic"),
          meta: {
            visible: true,
            title: '인포그래픽 | 시각화 | 문화셈터',
            menuInfo: '그림으로 보는 문화통계'
          }
        },
      ]
    },
    {
      path: '/info', // 정보공유
      name: '정보공유',
      component: () => import('../components/Contents'),
      meta: {
        visible: true
      },
      children: [
        {
          path: "ebook",
          name: "전자책",
          component: () =>
            import("../views/info/Ebook"),
          meta: {
            visible: true,
            title: '전자책 | 정보공유 | 문화셈터',
            menuInfo: '전자책'
          }
        },
        {
          path: "indexReport",
          name: "지표보고서",
          props: true,
          component: () =>
            import("../views/info/IndexReport"),
          meta: {
            visible: true,
            title: '지표보고서 | 정보공유 | 문화셈터',
            menuInfo: '지표보고서'
          }
        },
        {
          path: 'indexReport/indexReportDetail',
          name: '지표보고서 상세',
          component: () => import('../components/BoardDetailItem'),
          props: true,
          meta: {
            visible: false,
            title: '지표보고서 상세 | 정보공유 | 문화셈터',
            menuInfo: '지표보고서 상세'
          }
        },
        {
          path: "specialCategory",
          name: "특수분류",
          component: () =>
            import("../views/info/SpecialCategory"),
          meta: {
            visible: true,
            title: '특수분류 | 정보공유 | 문화셈터',
            menuInfo: '문화체육관광분야 특수분류체계 정보 제공'
          }
        },
        {
          path: "industryCategory",
          name: "산업분류",
          component: () =>
            import("../views/info/IndustryCategory"),
          meta: {
            visible: true,
            title: '산업분류 | 정보공유 | 문화셈터',
            menuInfo: '문화체육관광분야 산업분류체계 정보 제공'
          }
        },
        {
          path: "mdss",
          name: "MDSS",
          component: () =>
            import("../views/info/Mdss"),
          props: true,
          meta: {
            visible: true,
            title: 'MDSS | 정보공유 | 문화셈터',
            menuInfo: '문화체육관광 통계원자료에 대한 제공서비스'
          }
        },
        {
          path: "etcData",
          name: "기타자료실",
          component: () =>
            import("../views/info/EtcData"),
          meta: {
            visible: true,
            title: '기타자료실 | 정보공유 | 문화셈터',
            menuInfo: '기타자료실'
          }
        },
        {
          path: 'etcData/etcDataDetail',
          name: '기타자료실 상세',
          component: () => import('../components/BoardDetailItem'),
          props: true,
          meta: {
            visible: false,
            title: '기타자료실 상세 | 정보공유 | 문화셈터',
            menuInfo: '기타자료실 상세'
          }
        }
      ]
    },
    {
      path: '/notice', // 공지·알림
      name: '공지·알림',
      component: () => import('../components/Contents'),
      meta: {
        visible: true
      },
      children: [
        {
          path: "notice",
          name: "공지사항",
          component: () =>
            import("../views/notice/Notice"),
          meta: {
            visible: true,
            title: '공지사항 | 공지·알림 | 문화셈터',
            menuInfo: '문화셈터에서 알리는 공지사항'
          },
        },
        {
          path: 'notice/noticeDetail',
          name: '공지사항 상세',
          component: () => import('../components/BoardDetailItem'),
          props: true,
          meta: {
            visible: false,
            title: '공지사항 상세 | 공지·알림 | 문화셈터',
            menuInfo: '문화셈터에서 알리는 공지사항'
          }
        },
        {
          path: "faq",
          name: "FAQ",
          component: () =>
            import("../views/notice/Faq"),
          meta: {
            visible: true,
            title: 'FAQ | 공지·알림 | 문화셈터',
            menuInfo: '문화셈터에 대해 자주 하는 질문과 답변'
          }
        },
        {
          path: 'faq/faqDetail',
          name: 'FAQ 상세',
          component: () => import('../components/BoardDetailItem'),
          props: true,
          meta: {
            visible: false,
            title: 'FAQ 상세 | 공지·알림 | 문화셈터',
            menuInfo: '문화셈터에 대해 자주 하는 질문과 답변'
          }
        },
        // {
        //   path: "survey",
        //   name: "설문조사",
        //   component: () =>
        //     import("../views/notice/Survey"),
        //   meta: {
        //     visible: true,
        //     title: '설문조사 | 공지·알림 | 문화셈터',
        //     menuInfo: '다양한 통계지표 생산을 위한 설문조사'
        //   }
        // },
        {
          path: "privacyPolicy",
          name: "개인정보처리방침",
          component: () =>
            import("../views/notice/PrivacyPolicy"),
          meta: {
            visible: true,
            title: '개인정보처리방침 | 공지·알림 | 문화셈터',
            menuInfo: '문화셈터에서 처리되는 개인정보처리 방침'
          }
        },
        {
          path: "copyright",
          name: "저작권정책",
          component: () =>
            import("../views/notice/Copyright"),
          meta: {
            visible: true,
            title: '저작권정책 | 공지·알림 | 문화셈터',
            menuInfo: '문화셈터 저작물에 대한 이용 방침'
          }
        }
      ]
    },
    {
      path: '/intro',  // 소개마당
      name: '소개',
      component: () => import('../components/Contents'),
      meta: {
        visible: true
      },
      children: [
        // {
        //   path: "mcstOperationIntro",
        //   name: "문화체육관광 통계개발 운영사업 소개",
        //   component: () =>
        //     import("../views/intro/McstOperationIntro"),
        //   meta: {
        //     visible: true,
        //     title: '문화체육관광 통계개발 운영사업 소개 | 소개 | 문화셈터',
        //     menuInfo: '문화체육관광 통계개발 운영에 대한 연혁'
        //   }
        // },
        {
          path: "mcstIntro",
          name: "문화셈터 소개",
          component: () =>
            import("../views/intro/McstIntro"),
          meta: {
            visible: true,
            title: '문화셈터 소개 | 소개 | 문화셈터',
            menuInfo: '문화셈터 소개'
          }
        },
        {
          path: "mcstStatIntro",
          name: "문화셈터 통계 소개",
          component: () =>
            import("../views/intro/McstStatIntro"),
          meta: {
            visible: true,
            title: '문화셈터 통계 소개 | 소개 | 문화셈터',
            menuInfo: '문화셈터 통계 소개'
          }
        },
        // {
        //   path: "siteMap",
        //   name: "사이트맵",
        //   component: () =>
        //     import("../views/intro/SiteMap"),
        //   meta: {
        //     visible: true,
        //     menuInfo: '사이트맵'
        //   }
        // }
      ]
    },
    {
      path: "/search",
      name: "통합검색",
      component: () => import('../components/Contents'),
      meta: {
        visible: false,
        menuInfo: ' ',
      },
      children: [
        {
          path: "search",
          name: "통합 검색",
          component: () =>
            import("../views/search/Search"),
          meta: {
            visible: true,
            title: '통합검색 | 문화셈터',
            menuInfo: ' ',
          }
        }
      ]
    },
    {
      path: '/sns/single',
      name: 'single',
      component: () => import('../views/visual/SnsSingle'),
      meta: {
        visible: false
      }
    },

  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }

})

router.afterEach((to, from) => {
  const title = to.meta.title === undefined ? '문화셈터' : to.meta.title
  Vue.nextTick(() => {
    document.title = title
  })
})

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') throw err
  })
}
export default router
