import P1List from '../pages/modules/campaign-and-point/campaign-management/ListPage'
import P1Detail from '../pages/modules/campaign-and-point/campaign-management/DetailPage'
import P2List from '../pages/modules/campaign-and-point/direct-point/ListPage'
import P2Detail from '../pages/modules/campaign-and-point/direct-point/DetailPage'
import P3List from '../pages/modules/campaign-and-point/point-transfer-report/ListPage'
import P3Detail from '../pages/modules/campaign-and-point/point-transfer-report/DetailPage'
import P4List from '../pages/modules/campaign-and-point/qr-code-management/ListPage'
import P4Detail from '../pages/modules/campaign-and-point/qr-code-management/DetailPage'
import P5List from '../pages/modules/media-and-content/inspiring-catalog/ListPage'
import P5Detail from '../pages/modules/media-and-content/inspiring-catalog/DetailPage'
import P6List from '../pages/modules/media-and-content/knowledge-base/ListPage'
import P6Detail from '../pages/modules/media-and-content/knowledge-base/DetailPage'
import P7List from '../pages/modules/receipt-scanner/manage-and-verify-and-fraud/ListPage'
import P7Detail from '../pages/modules/receipt-scanner/manage-and-verify-and-fraud/DetailPage'
import P8List from '../pages/modules/receipt-scanner/ocr-sampling-check/ListPage'
import P8Detail from '../pages/modules/receipt-scanner/ocr-sampling-check/DetailPage'
import P9List from '../pages/modules/reward-and-redemption/e-voucher-management/ListPage'
import P9Detail from '../pages/modules/reward-and-redemption/e-voucher-management/DetailPage'
import P10List from '../pages/modules/reward-and-redemption/redemption-report/ListPage'
import P10Detail from '../pages/modules/reward-and-redemption/redemption-report/DetailPage'
import P11List from '../pages/modules/reward-and-redemption/redemption-management/ListPage'
import P11Detail from '../pages/modules/reward-and-redemption/redemption-management/DetailPage'
import P12List from '../pages/modules/reward-and-redemption/reward-item-management/ListPage'
import P12Detail from '../pages/modules/reward-and-redemption/reward-item-management/DetailPage'
import P13List from '../pages/modules/sale/sale-management/ListPage'
import P13Detail from '../pages/modules/sale/sale-management/DetailPage'
import P14List from '../pages/modules/sale/sale-network-management/ListPage'
import P14Detail from '../pages/modules/sale/sale-network-management/DetailPage'
import P15List from '../pages/modules/settings/admin-management/ListPage'
import P15Detail from '../pages/modules/settings/admin-management/DetailPage'
import P16List from '../pages/modules/settings/consent-management/ListPage'
import P16Detail from '../pages/modules/settings/consent-management/DetailPage'
import P17List from '../pages/modules/settings/external-link-settings/ListPage'
import P17Detail from '../pages/modules/settings/external-link-settings/DetailPage'
import P25Detail from '../pages/modules/settings/form-builder/DetailPage'
import DataTableBuilderPage from '../pages/DataTableBuilderPage'
import P18List from '../pages/modules/user/agent-and-sub-agent-management/ListPage'
import P18Detail from '../pages/modules/user/agent-and-sub-agent-management/DetailPage'
import P19List from '../pages/modules/user/certification-management/ListPage'
import P19Detail from '../pages/modules/user/certification-management/DetailPage'
import P20List from '../pages/modules/user/end-user/ListPage'
import P20Detail from '../pages/modules/user/end-user/DetailPage'
import P21List from '../pages/modules/user/member-media-and-announcement/ListPage'
import P21Detail from '../pages/modules/user/member-media-and-announcement/DetailPage'
import P22List from '../pages/modules/user/portfolio-report/ListPage'
import P22Detail from '../pages/modules/user/portfolio-report/DetailPage'
import P23List from '../pages/modules/user/referral-management-and-report/ListPage'
import P23Detail from '../pages/modules/user/referral-management-and-report/DetailPage'
import P24List from '../pages/modules/user/sub-agent-family/ListPage'
import P24Detail from '../pages/modules/user/sub-agent-family/DetailPage'

export const pageRegistry = [
  {
    section: "Campaign & Point",
    title: "Campaign Management",
    route: "/campaign-and-point/campaign-management",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P1List,
    DetailComponent: P1Detail,
    ReportComponent: null,
  },
  {
    section: "Campaign & Point",
    title: "Direct Point",
    route: "/campaign-and-point/direct-point",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P2List,
    DetailComponent: P2Detail,
    ReportComponent: null,
  },
  {
    section: "Campaign & Point",
    title: "Point Transfer Report",
    route: "/campaign-and-point/point-transfer-report",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P3List,
    DetailComponent: P3Detail,
    ReportComponent: null,
  },
  {
    section: "Campaign & Point",
    title: "QR Code Management",
    route: "/campaign-and-point/qr-code-management",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P4List,
    DetailComponent: P4Detail,
    ReportComponent: null,
  },
  {
    section: "Media & Content",
    title: "Inspiring Catalog",
    route: "/media-and-content/inspiring-catalog",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P5List,
    DetailComponent: P5Detail,
    ReportComponent: null,
  },
  {
    section: "Media & Content",
    title: "Knowledge Base",
    route: "/media-and-content/knowledge-base",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P6List,
    DetailComponent: P6Detail,
    ReportComponent: null,
  },
  {
    section: "Receipt Scanner",
    title: "Manage & Verify & Fraud",
    route: "/receipt-scanner/manage-and-verify-and-fraud",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P7List,
    DetailComponent: P7Detail,
    ReportComponent: null,
  },
  {
    section: "Receipt Scanner",
    title: "OCR Sampling Check",
    route: "/receipt-scanner/ocr-sampling-check",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P8List,
    DetailComponent: P8Detail,
    ReportComponent: null,
  },
  {
    section: "Reward & Redemption",
    title: "E-Voucher Management",
    route: "/reward-and-redemption/e-voucher-management",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P9List,
    DetailComponent: P9Detail,
    ReportComponent: null,
  },
  {
    section: "Reward & Redemption",
    title: "Redemption Report",
    route: "/reward-and-redemption/redemption-report",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P10List,
    DetailComponent: P10Detail,
    ReportComponent: null,
  },
  {
    section: "Reward & Redemption",
    title: "Redemption management",
    route: "/reward-and-redemption/redemption-management",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P11List,
    DetailComponent: P11Detail,
    ReportComponent: null,
  },
  {
    section: "Reward & Redemption",
    title: "Reward Item Management",
    route: "/reward-and-redemption/reward-item-management",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P12List,
    DetailComponent: P12Detail,
    ReportComponent: null,
  },
  {
    section: "Sale",
    title: "Sale Management",
    route: "/sale/sale-management",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P13List,
    DetailComponent: P13Detail,
    ReportComponent: null,
  },
  {
    section: "Sale",
    title: "Sale Network Management",
    route: "/sale/sale-network-management",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P14List,
    DetailComponent: P14Detail,
    ReportComponent: null,
  },
  {
    section: "Settings",
    title: "Admin Management",
    route: "/settings/admin-management",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P15List,
    DetailComponent: P15Detail,
    ReportComponent: null,
  },
  {
    section: "Settings",
    title: "Consent Management",
    route: "/settings/consent-management",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P16List,
    DetailComponent: P16Detail,
    ReportComponent: null,
  },
  {
    section: "Settings",
    title: "External link settings",
    route: "/settings/external-link-settings",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P17List,
    DetailComponent: P17Detail,
    ReportComponent: null,
  },
  {
    section: "Builder",
    title: "Form Builder",
    route: "/settings/form-builder",
    hasListView: false,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: null,
    DetailComponent: P25Detail,
    ReportComponent: null,
  },
  {
    section: "Builder",
    title: "Table Builder",
    route: "/settings/table-builder",
    hasListView: false,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: null,
    DetailComponent: DataTableBuilderPage,
    ReportComponent: null,
  },
  {
    section: "User",
    title: "Agent & Sub-agent Management",
    route: "/user/agent-and-sub-agent-management",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P18List,
    DetailComponent: P18Detail,
    ReportComponent: null,
  },
  {
    section: "User",
    title: "Certification Management",
    route: "/user/certification-management",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P19List,
    DetailComponent: P19Detail,
    ReportComponent: null,
  },
  {
    section: "User",
    title: "End-user",
    route: "/user/end-user",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P20List,
    DetailComponent: P20Detail,
    ReportComponent: null,
  },
  {
    section: "User",
    title: "Member Media and Announcement",
    route: "/user/member-media-and-announcement",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P21List,
    DetailComponent: P21Detail,
    ReportComponent: null,
  },
  {
    section: "User",
    title: "Portfolio report",
    route: "/user/portfolio-report",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P22List,
    DetailComponent: P22Detail,
    ReportComponent: null,
  },
  {
    section: "User",
    title: "Referral management & Report",
    route: "/user/referral-management-and-report",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P23List,
    DetailComponent: P23Detail,
    ReportComponent: null,
  },
  {
    section: "User",
    title: "Sub-agent Family",
    route: "/user/sub-agent-family",
    hasListView: true,
    hasDetailView: true,
    hasReportView: false,
    ListComponent: P24List,
    DetailComponent: P24Detail,
    ReportComponent: null,
  }
]
