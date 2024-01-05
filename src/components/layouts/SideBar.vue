<template>
    <div class="sidebar" data-color="#3d008d" style="background-color:#3d008d">
        <!-- logo -->
        <div style="background-color:#3d008d; text-align:center" class="logo">
            <a href="/employees"><img src="@/assets/logo.png" style="width:150px; height:150px"></a>
        </div>
    
        <div class="custom-hr"></div>

        <!-- sidebar content below logo -->
        <div class="sidebar-wrapper" id="sidebar-wrapper" style="background-color: #3d008d">
            <ul class="nav" style="background-color: #3d008d">
                <li class="">
                    <a href="/employees">
                        <i class="now-ui-icons design_app"></i>
                        <p>Dashboard</p>
                    </a>
                </li>
    
                <li class="">
                    <a href="/settings">
                        <i class="now-ui-icons ui-1_settings-gear-63"></i>
                        <p>Settings</p>
                    </a>
                </li>
    
                <li class="">
                    <a href="/employees">
                        <i class="now-ui-icons users_single-02"></i>
                        <p>Manage Users</p>
                    </a>
                </li>
    
                <li class="">
                    <a href="/products">
                        <i class="now-ui-icons ui-1_lock-circle-open"></i>
                        <p>Products</p>
                    </a>
                </li>

                <li class="">
                    <a href="/reports">
                        <i class="now-ui-icons arrows-1_cloud-download-93"></i>
                        <p>Reports</p>
                    </a>
                </li>
    
                <!-- <li>
                    <div style="color:white; margin-left:15px">--------------------------------------</div>
                </li> -->

                <div class="underline">

                </div>
                
                <hr class="custom-hr">

                <div style="margin-top:20px;">
                    <li class="">
                        <button type="submit" class="logout">
                            <i style="color:white;" class="now-ui-icons media-1_button-power"></i>
                            <span style="color: white;">
                                Logout
                            </span>
                        </button>
                    </li>
                </div>
            </ul>
        </div>
    </div>
</template>

<style>
.custom-hr {
    color: white;
    width: 90%;
    margin: 0 auto;    
    border-style: dashed;
    border-width: 2px;
}
  
.logout {
    background-color: #3d008d; 
    padding: auto auto; 
    color: white; 
    border-color: transparent;
}
 
.underline {
    content: '';
    position: absolute;
    bottom: 0;
    right: 15px;
    height: 1px;
    width: calc(100% - 30px);
    background-color: rgba(255, 255, 255, 0.5);
  }
</style>