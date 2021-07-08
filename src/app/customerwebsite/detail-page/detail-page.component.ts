import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fontStyle } from 'html2canvas/dist/types/css/property-descriptors/font-style';
import { StringValueToken } from 'html2canvas/dist/types/css/syntax/tokenizer';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute) { }

  pageContent: String;
  pageHeader: String;
  pageImg: String;
  pageHeaderImg: String;
  listContent: Array<String>;

  ngOnInit(): void {
    if (this.activateRoute.snapshot.params['id'] == 1) {
      this.pageHeader = "Bảo hiểm chăm sóc y tế";
      this.pageImg = "https://www.baovietnhantho.com.vn/storage/8df54680-da1f-4000-a131-72749a7fe70c/c/BHChamSocYTe-cover-large.jpg";
      this.pageHeaderImg = "https://www.baovietnhantho.com.vn/storage/8df54680-da1f-4000-a131-72749a7fe70c/c/BHChamSocYTe-cover-large.jpg";
      this.pageContent =
        "<b>QUYỀN LỢI TRỢ CẤP VIỆN PHÍ</b>"
        + "<br><br>- Trợ cấp viện phí cơ bản: Chi trả 100% số tiền bảo hiểm cho mỗi ngày nằm viện, lên tới 100 ngày trong 12 tháng</br></br>"
        + "- Trợ cấp viện phí đặc biệt: Chi trả 200% số tiền bảo hiểm cho mỗi ngày nằm viện, lên tới 300 ngày trong toàn bộ thời hạn bảo hiểm của sản phẩm bổ trợ.</br></br>"
        + "- Áp dụng riêng đối với Người được bảo hiểm dưới 4 tuổi</br></br>"
        + "<b>QUYỀN LỢI TRỢ CẤP PHẪU THUẬT</b></br></br>"
        + "- Chi trả 500% Số tiền bảo hiểm</br></br>"
        + "-Số lần phẫu thuật chi trả lên tới 2 lần trong 12 tháng và 10 lần trong toàn bộ thời hạn bảo hiểm của sản phẩm bổ trợ.</br></br>"
        + "-Áp dụng riêng đối với Người được bảo hiểm dưới 4 tuổi.</br></br>"
        + "<b>QUYỀN LỢI THƯỞNG KHI KHÔNG CÓ YÊU CẦU GIẢI QUYẾT QUYỀN LỢI BẢO HIỂM</b>"
        + "<br><br>- Thưởng 1 định kỳ phí bảo hiểm năm của sản phẩm bổ trợ vào Ngày kỷ niệm Hợp đồng lần thứ 8 và mỗi 8 năm sau đó, nếu Hợp đồng vẫn còn hiệu lực.</br></br>"
        + "- Thưởng khi không có yêu cầu giải quyết Quyền lợi bảo hiểm: Nếu trong kỳ xét thưởng (8 năm) không có bất kỳ yêu cầu giải quyết Quyền lợi bảo hiểm nào được chi trả.</br></br>"
        + "- Áp dụng riêng đối với Người được bảo hiểm dưới 4 tuổi</br></br>"

    } else if (this.activateRoute.snapshot.params['id'] == 2) {
      this.pageHeader = "Bảo hiểm phẫu thuật và điều trị ngoại khoa";
      this.pageImg = "https://www.baovietnhantho.com.vn/storage/8df93397-a308-459a-8f05-02a4092c23f9/AnTamHanhPhuc-cover.jpg";
      this.pageHeaderImg = "https://www.baovietnhantho.com.vn/storage/8df93397-a308-459a-8f05-02a4092c23f9/AnTamHanhPhuc-cover.jpg";
      this.pageContent =
        "Sản phẩm này không chỉ giúp Bạn quẳng gánh lo âu về mặt tài chính, mà còn giúp Bạn có điều kiện để yên tâm lựa chọn phương thức điều trị tốt hơn nếu không may Bạn phải phẫu thuật, điều trị ngoại khoa - Bạn và những người thân hoàn toàn an tâm điều trị để sớm bình phục sức khỏe.<br/><br/>"
        +"<br><br><b>BẠN ĐƯỢC QUYỀN LỢI GÌ</b></br></br>"
        +"-Bạn sẽ được nhận trợ cấp trong trường hợp phải phẫu thuật và/hoặc điều trị ngoại khoa (*). Khoản trợ cấp này giúp Bạn có điều kiện để lựa chọn những dịch vụ chữa trị, thuốc men với chất lượng cao hơn.</br></br>"
        +"-Tổng số trường hợp được chi trả tiền bảo hiểm lên đến 535 loại phẫu thuật, điều trị ngoại khoa khác nhau</br></br>"
        +"-Linh hoạt tham gia khi có thể tham gia cùng lúc với Hợp đồng chính hoặc sau khi Hợp đồng chính đã có hiệu lực</br></br>"
        +"-Bạn được chi trả quyền lợi bảo hiểm theo Số tiền bảo hiểm và tỷ lệ trả tiền bảo hiễm phẫu thuật và điều trị ngoại khoa được quy định trong Điều khoản sản phẩm).</br></br>"
        +"-Được bảo hiểm liên tục với Quyền lợi tự động tái tục bảo hiểm hàng năm</br></br>"     
    } else if (this.activateRoute.snapshot.params['id'] == 3) {
      this.pageHeader = "Chăm sóc sức khỏe dành cho phụ nữ";
      this.pageImg = "http://nhanhauclinic.com.vn/wp-content/uploads/2020/11/kham-benh-cho-ng%C6%B0%C6%A1i-ngheo.jpg";
      this.pageHeaderImg = "http://nhanhauclinic.com.vn/wp-content/uploads/2020/11/kham-benh-cho-ng%C6%B0%C6%A1i-ngheo.jpg";
      this.pageContent =
      "Con người là hoa của đất và phụ nữ là hương hoa của cuộc đời. Ngoài đặc ân là phái đẹp, tạo hóa đã ban cho người phụ nữ một thiên chức vô cùng quan trọng và cao quý là làm vợ, làm mẹ. Để bạn luôn tự hào và hãnh diện khi được tạo hóa ban cho đặc ân, giao cho một trọng trách vô cùng quan trọng và cao quý ấy - bạn hãy chủ động tạo cho mình một cuộc sống vui về tinh thần và khỏe mạnh về thể chất.</br></br>"
      +"<br><br><b>BẠN ĐƯỢC QUYỀN LỢI GÌ</b></br></br>"
      +"-Sự chăm sóc và bảo vệ sức khỏe toàn diện dành cho phụ nữ với các quyền lợi bảo hiểm cho 8 bệnh ung thư phụ nữ, 36 bệnh lý nghiêm trọng, 7 bệnh biến chứng sản khoa và 597 loại phẫu thuật và điều trị ngoại khoa mở rộng.</br></br>"
      +"-Phạm vi bảo hiểm và mức trách nhiệm thiết thực với phụ nữ</br></br>"
      +"-Tiết kiệm lớn cho những dự định quan trọng trong tương lai khi kết hợp tham gia với Hợp đồng chính</br></br>"
      +"-Linh hoạt tham gia khi có thể tham gia cùng lúc với Hợp đồng chính hoặc sau khi Hợp đồng chính đã có hiệu lực.</br></br>"
      +"-Được bảo hiểm liên tục với Quyền lợi tự động tái tục bảo hiểm hàng năm</br></br>"  
    } else if (this.activateRoute.snapshot.params['id'] == 4) {
      this.pageHeader = "Bảo hiểm tai nạn toàn diện";
      this.pageImg = "https://ibaoviet.vn/wp-content/uploads/2018/09/tim-hieu-ve-goi-bao-hiem-tai-nan-toan-dien-nang-cao-1.jpg";
      this.pageHeaderImg = "https://ibaoviet.vn/wp-content/uploads/2018/09/tim-hieu-ve-goi-bao-hiem-tai-nan-toan-dien-nang-cao-1.jpg";
      this.pageContent =
      "Cuộc sống ngày nay luôn rình tập những hiểm họa, tai nạn rủi ro có thể bất ngờ ập tới bất kỳ ai trong chúng ta, gây nên không chỉ những mất mát về tài chính mà con là những nỗi đau tinh thần không thể nào bù đắp.<br/><br/>"
      +"<b>QUYỀN LỢI BẢO HIỂM RỦI RO DO TAI NẠN</b></br></br>"
      +"- Tử vong do tai nạn thông thường: Chi trả 100% Số tiền bảo hiểm còn lại.</br></br>"
      +"-Tử vong khi đang sử dụng các phương tiện vận chuyển hành khách đường bộ hoặc đường sắt: Chi trả 200% Số tiền bảo hiểm còn lại</br></br>"
      +"-Tử vong khi đi trên các chuyến máy bay thương mại: Chi trả 300% Số tiền bảo hiểm còn lại</br></br>"
      +"-Thương tật vĩnh viễn do tai nạn: Chi trả theo 15 mức độ thương tật, Tổng quyền lợi tối đa 100% Số tiền bảo hiểm.</br></br>"
      +"-Bỏng nặng do tai nạn: Chi trả 100% Số tiền bảo hiểm còn lại</br></br>"
      +"-Áp dụng đối với người được bảo hiểm dưới 4 tuổi, chi tiết trong điều khoản của sản phẩm.</br></br>" 
      +"-Số tiền bảo hiểm còn lại là số tiền bảo hiểm của Sản phẩm bổ trợ này trừ đi tổng số tiền đã trả trước đó trong trường hợp người được bảo hiểm bị thương tật vĩnh viễn do tai nạn (nếu có)</br></br>"
    } else {
      this.pageHeader = "Bảo hiểm các bệnh lý nghiêm trọng";
      this.pageImg = "https://www.manulife.com.vn/vi/san-pham-bo-tro-bao-hiem-nhan-tho/bao-hiem-benh-ly-nghiem-trong/_jcr_content/root/responsivegrid_641029165/responsivegrid_532132352/responsivegrid_copy/contentteaser_103927_1156311427.coreimg.jpeg/1596534668581.jpeg";
      this.pageHeaderImg = "https://www.manulife.com.vn/vi/san-pham-bo-tro-bao-hiem-nhan-tho/bao-hiem-benh-ly-nghiem-trong/_jcr_content/root/responsivegrid_641029165/responsivegrid_532132352/responsivegrid_copy/contentteaser_103927_1156311427.coreimg.jpeg/1596534668581.jpeg";
      this.pageContent =
      "Cuộc sống ngày càng hiện đại với các tiến bộ không ngừng trong khoa học công nghệ đã mang đến cho con người những ứng dụng hữu ích trong đời sống hàng ngày, nhưng cùng lúc đó những ảnh hưởng từ môi trường sống và từ chính con người cũng đem đến những rủi ro, hiểm họa khôn lường đối với sức khỏe và sinh mạng của mỗi chúng ta. <br/><br/>"
      +"<b>BẠN ĐƯỢC QUYỀN LỢI GÌ</b></br></br>"
      +"-Yên tâm điều trị để vượt qua bệnh tật với nguồn tài chính được Bảo Việt Nhân thọ chi trả khi không may mắc phải bệnh lý nghiêm trọng.</br></br>"
      +"-Phạm vi bảo hiểm thiết thực với 100% Số tiền bảo hiểm được Bảo Việt Nhân thọ chi trả nếu chẳng may mắc phải 1 trong 36 Bệnh lý nghiêm trọng</br></br>"
      +"-Linh hoạt tham gia khi có thể tham gia cùng lúc với Hợp đồng chính hoặc sau khi Hợp đồng chính đã có hiệu lực</br></br>"
      +"-Tiết kiệm lớn cho những dự định quan trọng trong tương lai khi kết hợp tham gia với Hợp đồng chính.</br></br>"
      +"-Được bảo hiểm liên tục với Quyền lợi tự động tái tục bảo hiểm hàng năm</br></br>" 
      +"<b>Điều kiện tham gia</b></br></br>"
      +"Độ tuổi tham gia : Từ 01 - 60 tuổi"
    }

  }
}
