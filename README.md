# frontend

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

파일 생성 순서 ex) account
1. routes/accounts.js 추가 -> 프론트 엔드포인트
2. routes/index.js에 account 추가
3. components/accounts/~~~~Form.vue 추가 
4. views/accounts/~~~~Page.vue 추가 
5. api/accounts.js 추가 -> 백엔드 API 호출
6. state 사용하려면 store/modules/accounts.js 추가