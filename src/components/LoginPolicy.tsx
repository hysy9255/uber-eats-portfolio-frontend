const LoginPolicy = () => {
  return (
    <div className="mt-auto pt-8">
      <div className="relative overflow-hidden rounded-2xl bg-white/85 backdrop-blur ring-1 ring-black/10">
        {/* 상단 컬러 액센트 바 (두께↑) */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-blue-500" />

        {/* 내부 패딩 크게 */}
        <div className="px-6 sm:px-7 py-6 sm:py-12 flex gap-4">
          {/* 아이콘 뱃지 사이즈↑ */}
          <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-100">
            <svg
              className="h-6 w-6 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>

          {/* 텍스트 영역: 행간/간격 여유 ↑ */}
          <div className="text-[13px] leading-relaxed text-slate-600 space-y-3">
            <p className="text-slate-800 font-medium">Secure sign-in</p>

            <p>
              By continuing, you agree to our{" "}
              <a
                href="/legal/terms"
                className="underline decoration-slate-300 underline-offset-2 hover:text-slate-800"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/legal/privacy"
                className="underline decoration-slate-300 underline-offset-2 hover:text-slate-800"
              >
                Privacy Policy
              </a>
              .
            </p>

            {/* 칩 영역도 위아래 여백 추가 */}
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="/help"
                className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-medium hover:bg-slate-200"
              >
                Help Center
              </a>
              <a
                href="/legal/cookies"
                className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-medium hover:bg-slate-200"
              >
                Cookies
              </a>
              <a
                href="/legal/data"
                className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-medium hover:bg-slate-200"
              >
                Data & Security
              </a>
            </div>

            {/* reCAPTCHA 문구도 아래 여백 살짝 */}
            <p className="pt-1 text-[11px] text-slate-500">
              This site is protected by reCAPTCHA and the{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-slate-300 underline-offset-2 hover:text-slate-700"
              >
                Google Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-slate-300 underline-offset-2 hover:text-slate-700"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPolicy;
