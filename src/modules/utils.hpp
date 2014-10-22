/*
 Copyright (c) Sebastian Herrlinger - All rights reserved.
 This code is intended for use with the Cinder C++ library: http://libcinder.org
 
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that
 the following conditions are met:
 
 * Redistributions of source code must retain the above copyright notice, this list of conditions and
 the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 the following disclaimer in the documentation and/or other materials provided with the distribution.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
 */
#ifndef _UtilsModule_hpp_
#define _UtilsModule_hpp_

#pragma once

#define UTILS_MOD_ID 3

#include <map>

#include "../PipeModule.hpp"
#include "../utils/TextHelpers.cpp"

using namespace cinder;

namespace cjs {
  
class UtilsModule : public PipeModule {
  public:
    UtilsModule(){}
    ~UtilsModule(){}
  
    inline int moduleId() {
      return UTILS_MOD_ID;
    }
  
    void loadGlobalJS( v8::Local<v8::ObjectTemplate> &global );
    void draw(){};
  
  //
  private:
  
    // Simple Text Helpers
    // Using reference numbers to internal C++ Object to avoid wrapping/unwrapping of v8::Objects (slow)
    static void createSimpleText(const v8::FunctionCallbackInfo<v8::Value>& args);
    static void drawSimpleText(const v8::FunctionCallbackInfo<v8::Value>& args);
    static void updateSimpleText(const v8::FunctionCallbackInfo<v8::Value>& args);
    static void setSimpleTextPos(const v8::FunctionCallbackInfo<v8::Value>& args);
    static std::map<uint32_t, boost::shared_ptr<SimpleText>> sTextObjects;
    static uint32_t sTextObjectIds;
  
    // Buffers
    static Vec3f bufVec3f_1;
 };
  
} // namespace cjs

#endif