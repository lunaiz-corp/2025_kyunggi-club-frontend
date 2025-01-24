"use client"

import Link from "next/link"

import UnionLogo from "@packages/assets/images/union-logo.svg"

function openFtc(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()

  if (
    !window.open(
      e.currentTarget.href,
      "communicationViewPopup",
      "width=750, height=700;",
    )
  ) {
    // eslint-disable-next-line no-alert
    alert("팝업 차단을 해제해주세요.")
  }
}

export default function Footer() {
  return (
    <footer className="mx-auto mt-12 flex w-full max-w-[1200px] gap-11 py-12">
      <div>
        <Link href="/" className="flex items-center gap-[12px]">
          <UnionLogo
            className="h-[32px]"
            title="경기고등학교 이공계동아리연합 로고"
          />

          <div className="inline-flex flex-col gap-0.5 text-left">
            <span className="text-[10px] font-bold leading-[normal] text-gray-100">
              경기고등학교
            </span>
            <span className="text-[16px] font-bold leading-[normal] text-gray-100">
              이공계동아리연합
            </span>
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        <div className="inline-flex gap-8 text-sm text-gray-100">
          <a
            href="https://cs-kg.schooler.kr"
            className="font-medium"
            target="_blank"
            rel="noopener"
          >
            고객센터
          </a>

          <a
            href="https://cs-kg.schooler.kr/legal/tos"
            className="font-medium"
            target="_blank"
            rel="noopener"
          >
            서비스 이용약관
          </a>

          <a
            href="https://cs-kg.schooler.kr/legal/privacy"
            className="font-extrabold"
            target="_blank"
            rel="noopener"
          >
            개인정보 처리방침
          </a>

          <a
            href="https://cs-kg.schooler.kr/legal/stop-spam"
            className="font-medium"
            target="_blank"
            rel="noopener"
          >
            이메일 주소 무단 수집거부
          </a>
        </div>

        <div className="inline-flex flex-col gap-2.5">
          <span className="text-xs font-extralight text-ceruleanBlue-100">
            <span className="inline-flex items-center gap-1.5 leading-normal">
              <span>상호명 : 루나이즈</span>
              <span>|</span>

              <span>대표자 : 손지민</span>
              <span>|</span>

              <span>
                사업자등록번호 :{" "}
                <a
                  href="http://www.ftc.go.kr/info/bizinfo/communicationViewPopup.jsp?wrkr_no=1234567889"
                  className="hover:underline"
                  title="통신판매업 신고 확인 페이지로 이동"
                  data-disable-nprogress
                  onClick={openFtc}
                >
                  123-45-56789
                </a>
              </span>
              <span>|</span>

              <span>
                통신판매업 신고번호 :{" "}
                <a
                  href="http://www.ftc.go.kr/info/bizinfo/communicationViewPopup.jsp?wrkr_no=1234567889"
                  className="hover:underline"
                  title="통신판매업 신고 확인 페이지로 이동"
                  data-disable-nprogress
                  onClick={openFtc}
                >
                  제 2025-서울서초-0000
                </a>
              </span>
              <span>|</span>

              <span>
                고객센터 :{" "}
                <a
                  className="font-extrabold hover:underline"
                  href="tel:+827000000000"
                >
                  070-0000-0000
                </a>
              </span>
            </span>
          </span>

          <span className="text-xs font-extralight text-ceruleanBlue-100">
            Copyright &copy; 2025 LUNAIZ Corp. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
