import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './components/teams/TeamsList.vue';
import UserList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/Error/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue'
import UserFooter from './components/users/UserFooter.vue'

const router = createRouter({
    // history dan routes merupakan syntax bawaan dari vue router
    history: createWebHistory(),
    routes: [
        // path merupakan alamat URL kita setelah domain dan component mana yang akan dirender
        { path: '/', redirect: '/teams' },
        {
            path: '/teams', 
            meta: { needsAuth: true },
            components: { default: TeamsList, footer: TeamsFooter },
            children: [
                { name: 'teamsId', path: ':teamId', component: TeamMembers, props: true },
            ]
        },
        {
            path: '/users',
            components: { default: UserList, footer: UserFooter },
            beforeEnter(to, from, next) {
                console.log('Individu each');
                console.log(to, from);
                next();
            }
        },
        // Mendefinisikan props untuk memberi tahu router view bahwa
        // dynamic parameter harus diteruskan ke komponen berikutnya sebagai props
        // bukan hanya sebagai properi $route
        { path: '/:notFound(.*)', component: NotFound },
    ],
    // {path: '/teams/:teamId', component: TeamMembers, props: true},
    linkActiveClass: 'active',
    // scrollBehavior(to, from, savedPosition) {
    //     console.log(to, from, savedPosition);
    //     return { left: 0, top: 0 };
    // }
    scrollBehavior() {
        return { left: 0, top: 0 };
    }
});

// Before each untuk membaca function sebelum router dijalankan
router.beforeEach((to, from, next) => {
    // to : merupakan tujuan URL kemana
    // from : merupakan asal URL sebelumnya darimana
    // Next mengizinkan atau tidak nya akses ke URL
    console.log('Global before each');
    console.log(to, from);
    if(to.meta.needsAuth) {
        console.log('Please authentication hela blok!')
        next();
    } else {
        console.log('Udah auth')
        next()
    }
})

// router.afterEach(function(to, from) {
//     console.log('global after each');
//     console.log(to, from);
// });

export default router;