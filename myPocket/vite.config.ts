import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/comp/index.ts'), // 빌드가 시작되는 파일을 명시
      name: 'front-lib-skeleton',                     // 라이브러리 이름
      // the proper extensions will be added
      fileName: format => `index.${format}.js`        // 번들링된 최종 output 파일의 이름
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react'],                            // 라이브러리에 React 모듈이 같이 번들링되면 안되기 때문에 명시 (같이 변들링 되면 라이브러리를 실행하는 쪽 React 전역 변수와 충돌 가능성)
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React'                              // 라이브러리에 React 모듈이 같이 번들링되면 안되기 때문에 명시 (SYNTAX =>  <<모듈 이름>> : <<변수 이름>> )
        }
      }
    }
  }
})
